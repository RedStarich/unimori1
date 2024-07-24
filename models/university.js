const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  logo_url: { type: String, required: true },
  website_url: { type: String, required: true },
  established_year: { type: Number, required: true },
  type: { type: String, required: true },
  ranking: { type: Number, required: true },
  tuition_fees: { type: Number, required: true },
  acceptance_rate: { type: Number, required: true },
  contact_email: { type: String, required: true },
  contact_phone: { type: String, required: true },
  alternate_names: [String],
});

module.exports = mongoose.model('University', UniversitySchema);
