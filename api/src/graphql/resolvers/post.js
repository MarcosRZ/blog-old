import Post from '../../db/models/post';

function success(payload) {
  return { OK: true, payload };
}

function error(msg) {
  return { OK: false, error: msg || 'No se ha podido completar la operación.' };
}

export default {
  query: {
    posts: async (obj, { skip, limit }, ctx) => {
      console.log('ctx: ', ctx);

      const skipVal = skip || 0;
      const limitVal = limit || 0;

      const posts = await Post.find({ deletionDate: null })
        .sort({ date: -1 })
        .skip(skipVal)
        .limit(limitVal)
        .exec();

      return posts;
    },
    post: async (obj, { id }, ctx) => {
      const post = await Post.findOne({ _id: id }).exec();

      return post;
    },
  },
  mutation: {
    createPost: async (obj, args) => {
      const { post } = args;

      console.log(post);

      if (!post) throw new Error("There's no post to create");

      if (!post.date) post.date = new Date();

      const dbPost = new Post(post);

      const payload = await dbPost.save();

      return success(payload);
    },
    updatePost: async (obj, args) => {
      const { post } = args;

      const dbPost = await Post.findOne({ _id: post._id }).exec();

      console.log('DB POST: ', dbPost);

      if (!dbPost) return error('No se ha encontrado el documento en BD');

      const res = await Post.updateOne({ _id: post._id }, { $set: post }).exec();

      return res.ok === 1 ? success(post) : error(post);
    },

    deletePost: async (obj, args) => {
      const { _id } = args;

      const dbPost = await Post.findOne({ _id }).exec();

      if (!dbPost) return error('No se ha encontrado el documento en BD');

      const res = await Post.updateOne({ _id }, { $set: { deletionDate: new Date() } }).exec();

      const posts = Post.find({ deletionDate: null });

      console.log(res);

      return res.ok === 1 ? success(posts) : error();
    },
  },
  resolvers: {},
};
