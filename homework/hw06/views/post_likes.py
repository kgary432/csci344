import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.like_post import LikePost
from models.post import Post
from views import can_view_post



class PostLikesListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def post(self):
        # TODO: Add POST logic...
        data = request.json
        post_id =  data.get("post_id")    #Gets the post id from the http request
        print(f"POST ID={post_id}")
        
        # Check for no id  given, 404
        if (post_id is None):
            return Response(
                json.dumps({
                    "message": "A post id is reqired to add a bookmark for that post."
                }),
                mimetype="application/json", 
                status=400)
        
        # Check for bad input (a string)
        try:
            post_id = int(post_id)
        except:
            return Response(
                json.dumps({
                    "message": "The post id must be an integer."
                }),
                mimetype="application/json", 
                status=400)

        # Check if post exists
        post = Post.query.get(post_id)

        if post is None:
            return Response(
                json.dumps({
                    "message": f"Post id={post_id} not found"
                }),
                mimetype="application/json", 
                status=404)


        # Check if they can view that post
        can_view = can_view_post(post_id, self.current_user)

        if not can_view:
            return Response(
                json.dumps({
                    "message": f"Post id={post_id} not found"
                }),
                mimetype="application/json", 
                status=404)
        
        # Check if already liked
        likes = (LikePost
                 .query.filter(LikePost.user_id.__eq__(self.current_user.id)))  # Gets all bookmarks for current user
        print(likes)
        # I want to see if a bookmark with the same post_id is already here
        # I'm not crazy about this solution but it does seem to work...
        for like in likes:
            if (like.post_id == post_id):
                return Response(
                json.dumps({
                    "message": f"Post id={post_id} has already been bookmarked."
                }),
                mimetype="application/json", 
                status=400)
        

        # If it passes all of this, we can make the new bookmark

        new_like = LikePost(self.current_user.id, post_id)
        db.session.add(new_like)    #issues the insert statement
        db.session.commit()  #Comits the change to the database

        return Response(
            json.dumps(new_like.to_dict()), mimetype="application/json", status=201)


class PostLikesDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add DELETE logic...

        print("Like id=", id)

        like = LikePost.query.get(id)
        # Validate it exists (if not 404 not found)
        if like is None:
            return Response(
                json.dumps({
                    "message": f"Bookmark id={id} not found"
                }),
                mimetype="application/json", 
                status=404)
        # Check that they even have a bookmark for that post
        if like.user_id != self.current_user.id:
            return Response(
                json.dumps({
                    "message": f"Bookmark id={id} not found for User={self.current_user.id}"
                }),
                mimetype="application/json", 
                status=404)
        
        like.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(
            json.dumps({"message":f"Bookmark id={like.id} has been successfully deleted."}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostLikesListEndpoint,
        "/api/likes",
        "/api/likes/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        PostLikesDetailEndpoint,
        "/api/likes/<int:id>",
        "/api/likes/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )