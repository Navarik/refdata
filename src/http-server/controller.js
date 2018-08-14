class Controller {
  constructor(handler, successCode) {
    this.handler = handler
    this.successCode = successCode || 200
  }

  async run(req, res) {
    const params = { ...(req.params || {}), ...(req.query || {}) }

    try {
      const reply = await this.handler({ params, body: req.body })

      if (reply === undefined) {
        res.status(404).send()
      } else {
        res.status(this.successCode).json(reply)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default Controller
