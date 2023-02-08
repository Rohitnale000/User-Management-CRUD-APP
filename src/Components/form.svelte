<script>
	import TableComponent from './tableComponent.svelte';
  import NavigationBar from "./navigationBar.svelte";
 
  import {createEventDispatcher} from'svelte';
  const dispatch = createEventDispatcher();
  export let editUserData;
  export let displayStatus;
  let userDetailObj={
   firstName:'',
   middleName:'',
   lastName:'',
   email:'',
   password:'',
   gender:'',
   dateOfBirth:'',
   address:''
  }
 if (displayStatus==="updateDataForm") {
  userDetailObj=editUserData
 } else {
  userDetailObj;
 }
  console.log(editUserData);
  
  const submitButtonACtion=()=>{
    if (displayStatus==="updateDataForm") {
    dispatch('onUpdate', userDetailObj);
 } else {
    dispatch('userObject', userDetailObj);
  }
 
 }

  
</script>

<div class="container col-6">
    <div class="form-group">
        <label for="" class="allFormLebeal">First Name</label>
        <input bind:value={userDetailObj.firstName} class="form-control form-control-lg" type="text" placeholder="Enter First Name">
      </div>
      <div class="form-group">
        <label for="" class="allFormLebeal">Middle Name</label>
        <input bind:value={userDetailObj.middleName} class="form-control form-control-lg" type="text" placeholder="Enter Middle Name">
      </div>
      <div class="form-group">
        <label for="" class="allFormLebeal">Last Name</label>
        <input bind:value={userDetailObj.lastName} class="form-control form-control-lg" type="text" placeholder="Enter Last Name">
      </div>
    <div class="form-group">
      <label for="" class="allFormLebeal">Email address</label>
      <input bind:value={userDetailObj.email} type="email" class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="" class="allFormLebeal">Password</label>
      <input bind:value={userDetailObj.password} type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
    </div>
    <div class="form-group">
        <label for="" class="allFormLebeal">Select Gender</label>
        <select bind:value={userDetailObj.gender} class="form-control form-control-lg" id="inputGroupSelect02">
          <option selected>Choose...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="" class="allFormLebeal">Date</label>
        <input bind:value={userDetailObj.dateOfBirth} type="date" class="form-control form-control-lg" name="" id="">
    </div>
    <div class="form-group">
        <label for="" class="allFormLebeal">Address</label>
        <input bind:value={userDetailObj.address} class="form-control form-control-lg" type="text" placeholder="Enter full address">
      </div>
    <br>
    <button type="submit" class="btn btn-primary btn-lg" on:click={submitButtonACtion}>Submit</button>
    
</div>



  <style>

  </style>