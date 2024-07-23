import dbConnect from '../../../lib/dbConnect';
import University from '../../../src/models/University';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const universities = await University.find({});
        res.status(200).json({ success: true, universities });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const university = await University.create(req.body);
        res.status(201).json({ success: true, university });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
