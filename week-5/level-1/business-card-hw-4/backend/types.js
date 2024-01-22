const zod = require("zod");

const types = {
  username: zod.string().email(),
  password: zod.string(),
  name: zod.string(),
  desc: zod.string(),
  interest1: zod.string(),
  interest2: zod.string(),
  interest3: zod.string(),
  linkedin: zod.string(),
  instagram: zod.string(),
};

module.exports({
  types: types,
});
