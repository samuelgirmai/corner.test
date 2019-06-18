import _ from 'lodash'

class Store {
  caps = null;
  persons = null;
  clients = null;
  services = null;
  logs = null;
  stats = {
    users: {
      person: 0,
      client: 0,
      service: 0
    }
  }
};

var _store;

export async function init()
{
  _store = new Store();
}

export async function update(doc, data)
{
  switch(doc){
    case 'caps':
      _store.caps = data;
      break;
    case 'persons':
      _store.persons = data;
      break;
    case 'clients':
      _store.clients = data;
      break;
    case 'services':
      _store.services = data;
      break;
    case 'logs':
      _store.logs = data;
      break;
  }
}

export function read(doc, arg)
{
  switch(doc){
    case 'caps':
      return read_caps(arg);
    case 'persons':
      return read_persons(arg);
    case 'clients':
      return read_clients(arg);
    case 'services':
      return read_services(arg);
    case 'logs':
      return read_logs(arg);
    case 'stats':
      return read_stats(arg);
  }
}

function read_caps(capid)
{
  if(!_store.caps){
    return [];
  }

  if(capid){
    let s =  _.filter(_store.caps, {'id': capid});

    return s[0];
  }

  return _store.caps;
}

function read_persons(uid)
{
  if(!_store.persons){
    return [];
  }

  if(uid){
    let s =  _.filter(_store.persons, {'user_id': uid});

    return s[0];
  }

  return _store.persons;
}

function read_clients(uid)
{
  if(!_store.clients){
    return [];
  }

  if(uid){
    let s =  _.filter(_store.clients, {'user_id': uid});

    return s[0];
  }

  return _store.clients;
}

function read_services(uid)
{
  if(!_store.services){
    return [];
  }

  if(uid){
    let s =  _.filter(_store.services, {'user_id': uid});

    return s[0];
  }

  return _store.services;
}

function read_logs(status)
{
  if(!_store.logs){
    return [];
  }

  return _store.logs;
}

function read_stats(type)
{
  if(!_store.stats[type]){
    return [];
  }

  return _store.stats[type];
}

export function write(doc, data)
{
  switch(doc){
    case 'caps':
      _store.caps = data;
      break;
    case 'persons':
      _store.persons = data;
      break;
    case 'clients':
      _store.clients = data;
      break
    case 'services':
      _store.services = data;
      break
    case 'logs':
      _store.logs = data;
      break;
    case 'stats':
      write_stats(data);
      break;
  }
}

function write_stats(stats){
  _store.stats[stats.type] = stats.val;
}


const STORE = {
  init: init,
  read: read,
  write: write
}

export default STORE
