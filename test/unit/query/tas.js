const QueryBuilder = require('../../../lib/query/querybuilder');
const Raw = require('../../../lib/raw');
const Client = require('../../../lib/client');
const { expect } = require('chai');

describe ('Custom TAS behavior', () => {

  it(`enable Raw type alias of the '.with()' function`, done => {
    const builder = new QueryBuilder({});
    const raw = new Raw().set('subprocesses (IPROC_ID)');

    builder.with(raw, statement = () => {});
    done();
  });

  it('Make .whereIn(singleValue) possible again', done => {
    const client = new Client({
      client: 'mssql',
    });

    const nonArrayValue = 'A';
    const resolvedSingle = client.values(nonArrayValue, null, {
      bindings: [],
    });

    const nullValue = null;
    const resolvedNull = client.values(nullValue, null, {
      bindings: [],
    });

    expect(resolvedSingle).to.equal('(?)');
    expect(resolvedNull).to.equal('(?)');
    done();
  });
});
