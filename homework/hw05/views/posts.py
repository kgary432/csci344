import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        '''
        Return the first 20 posts in the user's feed. if the user specifies a limit, honor it
        unless it's above 50, then return an error to prevent DNS attacks.
        '''
    
        count = request.args.get("limit");

        if count is None:
            count = 20;
        
        try:
            count = int(count);
        except:
            return Response(json.dumps( 
                {"message": "Limit must be an integer"}), 
                mimetype="application/json", status=400)
        if count > 50:
            return Response(json.dumps( 
                {"message": "Limit limit is 50"}), 
                mimetype="application/json", status=400)



        # giving you the beginnings of this code (as this one is a little tricky for beginners):
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        posts = (Post.query
                 .filter(Post.user_id.in_(ids_for_me_and_my_friends))
                 .limit(count))

        # TODO: add the ability to handle the "limit" query parameter:

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):
        # TODO: handle POST logic
        #capture data sent from the user and verify the data, throw error if needed

        image_url = request.args.get('image_url');

        #optional
        caption = request.args.get('caption');
        alt_text = request.args.get('alt_text');

        if image_url is None:
            return Response(json.dumps({"message": "Bad user! Bad! Image url is required."}), mimetype="application/json", status=400)


        return Response(json.dumps({}), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        # TODO: Add PATCH logic...
        return Response(json.dumps({}), mimetype="application/json", status=200)

    def delete(self, id):
        print("POST id=", id)

        # TODO: Add DELETE logic...
        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        print("POST id=", id)
        # TODO: Add GET logic...
        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )


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
