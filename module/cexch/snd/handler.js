const HANDLER = [
  {
    e_name: "REQUESTED_init",
    cb: REQUESTED_init
  },
  {
    e_name: "CONFIRMED_init",
    cb: CONFIRMED_init
  },
  {
    e_name: "FC_DEPOSITE_CONFIRMED_init",
    cb: FC_DEPOSITE_CONFIRMED_init
  },
  {
    e_name: "FC_DEPOSITE_COMPLETE_init",
    cb: FC_DEPOSITE_COMPLETE_init
  },
  {
    e_name: "FRAGMENT_COMPLETE_init",
    cb: FRAGMENT_COMPLETE_init
  },
  {
    e_name: "TRANSFER_COMPLETE_init",
    cb: TRANSFER_COMPLETE_init
  },
  {       
    e_name: "REQUESTED_expire",
    cb: REQUESTED_expire
  },
  {
    e_name: "CONFIRMED_expire",
    cb: CONFIRMED_expire
  }
]

function REQUESTED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function CONFIRMED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function FC_DEPOSITE_CONFIRMED_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function FC_DEPOSITE_COMPLETE_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function FRAGMENT_COMPLETE_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function TRANSFER_COMPLETE_init(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function REQUESTED_expire(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

function CONFIRMED_expire(msg)
{
  console.log("\n= [%s -> %s] MSG(%s) = ", msg.from, msg.to, msg.e_name, msg.data);
}

export default HANDLER
