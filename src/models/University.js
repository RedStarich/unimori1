const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  logo_url: {
    type: String
  },
  website_url: {
    type: String
  },
  established_year: {
    type: Number
  },
  type: {
    type: String
  },
  ranking: {
    type: Number
  },
  tuition_fees: {
    type: Number
  },
  acceptance_rate: {
    type: Number
  },
  contact_email: {
    type: String
  },
  contact_phone: {
    type: String
  }
});

module.exports = mongoose.models.University || mongoose.model('University', UniversitySchema);
