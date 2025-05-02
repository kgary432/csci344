import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids, can_view_post


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        '''
        Return the first 20 posts in the users feed, unles the user 
        specifies a number cap that number at 50
        '''
        count =  request.args.get("limit")    #Gets the limit from the http request
        
        # Check for no limit given, default to 20
        if (count is None):
            count = 20
        
        # Check for bad input (a string)
        try:
            count = int(count)
        except:
            return Response(
                json.dumps({
                    "message": "The limit must be an integer between 1 and 50"
                }),
                mimetype="application/json", 
                status=400)

        # Check for count over the cap (reduce to 50)
        if (count > 50):
             return Response(
                json.dumps({
                    "message": "Max number of posts is 50"
                }),
                mimetype="application/json", 
                status=400)
        
        print(count)

        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)  # Gets a list of user ids, which includes the current ones
        posts = (Post
                 .query.filter(Post.user_id.in_(ids_for_me_and_my_friends))
                 .limit(count) )

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        # TODO: handle POST logic
        # Need image url, caption and, alt text

        data = request.json

        img = data.get("image_url")
        caption = data.get("caption")
        alt = data.get("alt_text")

        if (img is None):
            # Throw an error, this param is non-negotiable
            return Response(
                json.dumps({
                    "message": "image_url is required to create a post"
                }),
                mimetype="application/json", 
                status=400)
        # if (caption is None):
        #     # caption = ""
        # if (alt is None):
        #     # alt = ""        

        new_post = Post(
            image_url = img,
            user_id = self.current_user.id,
            caption = caption,
            alt_text=alt,
        )

        db.session.add(new_post)    #issues the insert statement
        db.session.commit()  #Comits the change to the database

        return Response(
            json.dumps(new_post.to_dict(user=self.current_user)), mimetype="application/json", status=201)


# Used when the user passes in a specific post's ID
class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        # TODO: Add PATCH logic...
        # All parameters are optional
        # Check for write permissions security rules
        
        # Make sure the post they want to update is theirs !! 
        # 1. Get the post
            
        post = Post.query.get(id)
        
        # Validate it exists (if not 404 not found)
        if post is None:
            return Response(
                json.dumps({
                    "message": f"Post id={id} not found"
                }),
                mimetype="application/json", 
                status=404)
        # Check that they made the post (if not 403 unauthorized)
        if post.user_id != self.current_user.id:
             return Response(
                json.dumps({
                    "message": f"User={self.current_user.id} does not have permission to update Post id={post.id}"
                }),
                mimetype="application/json", 
                status=404)
                    

        # 2. Get the request data        
            # Only change the send data
        data = request.json
        new_image = data.get("image_url")
        new_caption = data.get("caption")
        new_alt = data.get("alt_text")

        if new_caption is not None:
            post.caption = new_caption
        if new_image is not None:
            post.image_url = new_image
        if new_alt is not None:
            post.alt_text = new_alt

        # 3. Send updates to database
        db.session.commit()

        return Response(json.dumps(post.to_dict(user=self.current_user)), mimetype="application/json", status=200)

    def delete(self, id):
        print("POST id=", id)

        post = Post.query.get(id)
        # Validate it exists (if not 404 not found)
        if post is None:
            return Response(
                json.dumps({
                    "message": f"Post id={id} not found"
                }),
                mimetype="application/json", 
                status=404)
        # Check that they made the post (if not 403 unauthorized)
        if post.user_id != self.current_user.id:
             return Response(
                json.dumps({
                    "message": f"User={self.current_user.id} does not have permission to delete Post id={post.id}"
                }),
                mimetype="application/json", 
                status=404)
        
        Post.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(
            json.dumps({"message":f"Post id={post.id} has been successfully deleted."}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        print("POST id=", id)
        # Check we got a valid id and it exists in the database
            # It's already an integer because of the way the url is set up in the calling function
        # Verify this user has access (they are following or are the user of the post)

        can_view = can_view_post(id, self.current_user)

        if can_view:
            # Query for post and returnr
            post = Post.query.get(id)
            return Response(
                json.dumps(post.to_dict(user=self.current_user)),
                mimetype="application/json",
                status=200,
            )
        else:
            return Response(
                json.dumps({
                    "message": f"Post id={id} not found"
                }),
                mimetype="application/json", 
                status=404)

        


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )