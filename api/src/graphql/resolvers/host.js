import Host from '../../db/models/host';

function success(payload) {
  return { OK: true, payload };
}

function error(msg) {
  return { OK: false, error: msg || 'No se ha podido completar la operación.' };
}

export default {
  query: {
    hosts: async (obj, { skip, limit }) => {
      const skipVal = skip || 0;
      const limitVal = limit || 0;

      const hosts = await Host.find({ deletionDate: null })
        .sort({ date: -1 })
        .skip(skipVal)
        .limit(limitVal)
        .exec();

      return hosts;
    },
  },
  mutation: {
    createHost: async (obj, args) => {
      console.log(obj, args);

      const { host } = args;

      if (!host) throw new Error("There's no host to create");

      host.creationDate = new Date();

      const dbHost = new Host(host);

      const payload = await dbHost.save();

      return success(payload);
    },
    updateHost: async (obj, args) => {
      const { host } = args;

      const dbHost = await Host.findOne({ _id: host._id }).exec();

      console.log('DB HOST: ', dbHost);

      if (!dbHost) return error('No se ha encontrado el documento en BD');

      const res = await Host.updateOne({ _id: host._id }, { $set: host }).exec();

      return res.ok === 1 ? success(host) : error(host);
    },

    deleteHost: async (obj, args) => {
      const { _id } = args;

      const dbHost = await Host.findOne({ _id }).exec();

      if (!dbHost) return error('No se ha encontrado el documento en BD');

      const res = await Host.updateOne({ _id }, { $set: { deletionDate: new Date() } }).exec();

      const hosts = Host.find({ deletionDate: null });

      console.log(res);

      return res.ok === 1 ? success(hosts) : error();
    },
  },
  resolvers: {},
};
