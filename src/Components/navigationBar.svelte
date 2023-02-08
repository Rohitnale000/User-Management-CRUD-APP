<script>
  import Form from "./form.svelte";
  import TableComponent from "./tableComponent.svelte";

  let displayStatus="default";
  
  let userData = [];

  const getData = async() => {
      const res = await fetch(`http://localhost:3000/api/user`,
      {
        method:"GET",
        headers:{'content-type':'application/json'}
      })
  
      const data = await res.json(); 
      userData = data;
  }

  const addUser = () => {
    displayStatus="addClicked"
  };


//post Data
 
  const doPost= async (e)=> {
    displayStatus="formSubmit"
    let userDetailObj = e.detail;
    userData = userData.concat(userDetailObj)
    
    const res = await fetch('http://localhost:3000/api/user',{
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
      firstName:userDetailObj.firstName,
      middleName:userDetailObj.middleName,
      lastName: userDetailObj.lastName,
      gender: userDetailObj.gender,
      dateOfBirth:userDetailObj.dateOfBirth,
      email:userDetailObj. email,
      password: userDetailObj.password,
      address: userDetailObj.address,
      })
    })
      return (await res).text()
  }
 
  let editUserData;
  const displayForm = (e)=>{
    displayStatus="updateDataForm"
 editUserData=e.detail
  }


  const handleUserUpdateDetail = (e) =>{
    displayStatus="updateDataShow"
    console.log(e.detail);
    let id =editUserData.id;
    console.log(id);
    let index = userData.findIndex(res => res.id === id);
    if(index>-1){

      // let userTOUpdate ={
      // firstName:editUserData.firstName,
      // middleName:editUserData.middleName,
      // lastName: editUserData.lastName,
      // gender: editUserData.gender,
      // dateOfBirth:editUserData.dateOfBirth,
      // email:editUserData. email,
      // password: editUserData.password,
      // address: editUserData.address,
      // }




      fetch(`http://localhost:3000/api/user/`+ editUserData.id,{
      method:  'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      firstName:editUserData.firstName,
      middleName:editUserData.middleName,
      lastName: editUserData.lastName,
      gender: editUserData.gender,
      dateOfBirth:editUserData.dateOfBirth,
      email:editUserData. email,
      password: editUserData.password,
      address: editUserData.address,
      })
    })
      .then(response => response.json())
      .then(result => console.log(result))


    }
  }


  const handleUserDelete = (e)=>{
    displayStatus="formSubmit"
    console.log(e.detail);
    
    let index = userData.findIndex(res => res.id === e.detail);
    let user= userData[index];
    userData.splice(index,1)
    userData = userData
    fetch(`http://localhost:3000/api/user/`+e.detail,{
      method:  'DELETE'
    })
      .then(response => response.text())
      .then(result => console.log(result))
  }




</script>
<div class="container-fluid">
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <span class="navbar-brand1">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABtklEQVR4nO2ZPShFYRjHf5dEsriSrAwWGViUkiQMRh8Li7JZZVDko5QySBYGCzIZZRZyDcrHjUSxiluyuK7u0VvnLqeLc895OM/N+dV/fHuf3zmn932f80JISEhQ1ABDwBywAiwBE0ALECEP6ASOAeubHABRFDMPpH+QyOQBWAUaUMaoSwFn3oFhlFAOvHgUMUkB9Shg0IdEJmsoYFNA5BoFxAREPoDioEVuBERMyoIWuRUSKQ1a5EhAwqx6gbMjIHKKAqYFRJZRQI+ASC8KaBQQaUIBewIiuyjgUkDkAgVsCYhsoICOHPqQbDFj21FCtw+RLpRx50HCHG/UsehBxIxRRy2QzLEzrEMps/n+NjJEXO4r90Ahyom5EImTB5y4ELkiD4i7/EGnmiLg0YXIK1CCYqZyWLUWUEgUWPdw5jL/xCpRQBUw6fJz+ipPwAxQHYRAq/0033wIOJMEtoG2375DKbB76zPB4r/KOdBvzylK8x8JWFmEzNwijNgHPCugpOwafDHgs/uTShro83OB86xAwrKTACq8iIwrKN5yZMyLyKGCwi1H9r2IJBQUbmXZPENCQv4rn6Ej5y2yxDtPAAAAAElFTkSuQmCC"
        width="50"
        height="50"
        class="d-inline-block align-top"
        alt=""
      />
      User Management
    </span>
    <div class="container">
      <span class="navbar-brand" on:click={addUser}>Add User</span>
    </div>
  </nav>
</div>
{#if displayStatus==="addClicked"||displayStatus==="updateDataForm"}
<!-- <Form  on:userObject={doPost}/>
{:else if displayStatus==="updateDataForm"}/> -->
<Form on:onUpdate={handleUserUpdateDetail} on:userObject={doPost} {editUserData}{displayStatus}{userData} />
{:else if displayStatus==="formSubmit"|| displayStatus==="default" ||displayStatus==="updateDataShow"}
<TableComponent {userData}  on:userDelete={handleUserDelete} on:userUpdate={displayForm} {getData}/>
{/if}

<style>
  .container-fluid {
    margin: 0px;
    padding: 0px;
  }

  .navbar-brand1 {
    margin-top: 20px;
    font-size: 26px;
    font-weight: bold;
    color: white;
  }

  .navbar-brand {
    cursor: pointer;
    text-align: right;
    text-align: center;
    margin-left: 90%;
    color: white;
    font-size: 24px;
    border-radius: 10px;
  }
</style>
