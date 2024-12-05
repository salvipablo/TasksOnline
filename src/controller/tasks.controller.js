export const ManageTasks = (_req, res) => {
  try {
    res.render('index')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const ViewTasks = (_req, res) => {
  try {
    res.render('viewTasks')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}