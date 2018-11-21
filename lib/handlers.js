import { logger } from "./config";
import { LEVELS } from "./filter";

class Handlers {
  constructor(cage) {
    this.cage = cage;
  }

  createGetHandler() {
    return (req, res) => {
      const scope = req.params.scope || LEVELS.public;
      const username = req.params.username || "NaU";
      this.cage
        .getDino(username, scope)
        .then(hits => {
          res.json(hits);
        })
        .catch(e => {
          res.status(503);
          res.json({ error: e });
        });
    };
  }

  createGetByUserIdHandler() {
    return (req, res) => {
      const userId = req.params.userId || "NaU";
      this.cage
        .getDinoByUserId(userId)
        .then(hits => {
          res.json(hits);
        })
        .catch(e => {
          res.status(503);
          res.json({ error: e });
        });
    };
  }

  createSimpleSearchHandler() {
    return (req, res) => {
      const scope = req.params.scope || LEVELS.public;
      const query = req.params.query.trim() || "";
      const which = req.query.w || "all";
      this.cage
        .simpleSearch(query, scope, which)
        .then(hits => {
          res.json(hits);
        })
        .catch(e => {
          res.status(503);
          res.json({ error: e });
        });
    };
  }

  createBulkHandler() {
    return (req, res) => {
      const s = req.files.data.data.toString("utf8");
      const profiles = JSON.parse(`${s}`);
      this.cage
        .bulkInsert(profiles)
        .then(() => {
          res.json({ status: "updated" });
        })
        .catch(e => {
          res.status(503);
          res.json({ error: e });
        });
    };
  }

  createUpdateHandler() {
    return (req, res) => {
      this.cage
        .updateDino(req.body)
        .then(() => {
          res.json({ status: "updated" });
        })
        .catch(e => {
          res.status(503);
          res.json({ error: e });
        });
    };
  }

  createDeleteHandler() {
    return (req, res) => {
      this.cage
        .deleteDino(req.params.dinoId)
        .then(() => {
          res.json({ status: "deleted" });
        })
        .catch(e => {
          res.status(503);
          res.json({ error: e });
        });
    };
  }
}

export { Handlers as default };
