import { SendEmail } from "../services/emails.service.js"

export const TestEmailFunction = async (req, res) => {
  try {
    const { testTask } = req.body
    
    let opStatus = await SendEmail(testTask)

    res.status(200).send({ message: opStatus.message })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
