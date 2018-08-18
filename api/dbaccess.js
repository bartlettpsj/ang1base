// Start up
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const _ = require('lodash');
const fs = require('fs');
const {promisify} = require('util');

const DB_LOCATION = './data/records.json';

/**
 * Singleton for database access to lowdb
 */
class Dbaccess {
  constructor() {
    // Make sure DB directory exists
    this.initDatabase().then(ready => {

      // Initialize lowdb 'database"
      const adapter = new FileSync(DB_LOCATION);
      this.db = low(adapter);


      // Set initial database
      this.db.defaults({records: [], maxid: 0}).write();
    })

  }

  async initDatabase() {
    try {
      await promisify(fs.access)('data', fs.constants.F_OK);
    }
    catch (error) {
      if (error.errno == -2) {
        fs.mkdirSync('data');
      }
    }
  }

  /**
   * Perform initialize of database.
   *
   * @returns {Promise<void>}
   */
  async init(id) {
    this.db.set('maxid', 0).write();
    this.db.get('records').remove({}).write();
  };

  /**
   * Perform filter on data.
   *
   * @param filter
   */
  async filter(filter) {
    try {
      return this.db.get('records').filter(filter).value();
    } catch (error) {
      throw `db filter error: ${error} on filter: ${filter}`;
    }
  }

  /**
   * Perform find on data.
   *
   * @param filter
   */
  async find(filter) {
    try {
      return this.db.get('records').find(filter).value();
    } catch (error) {
      throw `db find error: ${error} on filter: ${filter}`;
    }
  }

  /**
   * Performs an upsert on a single note.
   *
   * @param note
   * @returns {Promise<void>}
   */
  async upsert(record) {
    try {
      const records = this.db.get('records');
      const id = _.get(records, 'id');
      record.modified = new Date();

      const getNextId = () => {
        const maxid = this.db.get('maxid').value() + 1;
        this.db.set('maxid', maxid).write();
        return maxid;
      };

      if (id) {
        // update find
        const foundrecord = records.find({id});
        if (foundrecord.value()) {
          foundrecord.assign(record).write();
        } else {
          // insert not found
          record.id = getNextId();
          records.push(record).write();
        }
      } else {
        // insert no id
        record.id = getNextId();
        notes.push(record).write();
      }

    } catch (error) {
      throw `db update error: ${error}`;
    }
  }

  /**
   * Perform delete of single note by id.
   *
   * @param id
   * @returns {Promise<void>}
   */
  async delete(id) {
    const records = this.db.get('records');
    records.remove({id}).write();
  };

}

module.exports = new Dbaccess();

