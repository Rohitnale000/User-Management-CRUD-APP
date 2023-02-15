<script>
  import UserManagement from "./../userManagement.svelte";
  import Form from "./form.svelte";
  import TableComponent from "./tableComponent.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { createEventDispatcher, onMount } from "svelte";
  $: page =1;
  let totalRecords="";
  let availableRecordPerPage=""
  let displayStatus = "default";
  let pageBlockToShow=""

  let userData = [];


  $: pageNumber = (e) => {
    if (e.detail.message === "next" && page < totalRecords) {
      page++;
      getData();
    } else if (e.detail.message === "prev" && page > 1 && page <= totalRecords) {
      page--;
      getData();
      console.log("prev pressed");
    } else if (e.detail > 0 && e.detail <= totalRecords) {
      page = e.detail;
      getData();
    }
  };

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/user/page/limit?page=${page}&limit=8`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const dataFromAPI = await res.json();
    userData = dataFromAPI.data;
    totalRecords=dataFromAPI.totalRecords;
    availableRecordPerPage=userData.length;
    pageBlockToShow=Math.ceil(totalRecords/8)
  };

  const addUser = () => {
    displayStatus = "addClicked";
  };

  const navigateToHome = ()=>{
    displayStatus = "homeClicked";
  }
  //post Data

  const doPost = async (e) => {
    console.log(e.detail);
    let userDetailObj = e.detail;

    if (
      e.detail.firstName.trim() === "" ||
      e.detail.lastName.trim() === "" ||
      e.detail.email.trim() === "" ||
      e.detail.password.trim() === "" ||
      e.detail.dateOfBirth.trim() === "" ||
      e.detail.address.trim() === ""
    ) {
      // toast.error("Please fill input with valid details", {
      //   position: "bottom-center",
      // });
      return;
    } else {
      if (
        !e.detail.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        // toast.error("Please enter valid email address", {
        //   position: "bottom-center",
        //   style: "border: 1px solid #713200; padding: 20px;",
        // });
        return;
      } else if(e.detail.password !== e.detail.confirmPassword){
        return
      }
      else {
        displayStatus = "formSubmit";
        toast.success(
          userDetailObj.firstName + " " + "you have Successfully register!"
        );
        userData = userData.concat(userDetailObj);

        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName: userDetailObj.firstName,
            middleName: userDetailObj.middleName,
            lastName: userDetailObj.lastName,
            gender: userDetailObj.gender,
            dateOfBirth: userDetailObj.dateOfBirth,
            email: userDetailObj.email,
            password: userDetailObj.password,
            address: userDetailObj.address,
            street: userDetailObj.street,
            landmark: userDetailObj.landmark,
            state: userDetailObj.state,
            city: userDetailObj.city,
            pinCode: userDetailObj.pinCode
          }),
        });
        // return (await res).text();
      }
    }
  };

  let editUserData;
  const displayForm = (e) => {
    displayStatus = "updateDataForm";
    editUserData = e.detail;
    
  };

  const handleUserUpdateDetail = (e) => {
    if (
      e.detail.firstName.trim() === "" ||
      e.detail.lastName.trim() === "" ||
      e.detail.email.trim() === "" ||
      e.detail.password.trim() === "" ||
      e.detail.dateOfBirth.trim() === "" ||
      e.detail.address.trim() === ""
    ) {
      toast.error("Please fill input with valid details", {
        position: "bottom-center",
      });
      return;
    } else {
      if (
        !e.detail.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ) {
        toast.error("Please enter valid email address", {
          position: "bottom-center",
          style: "border: 1px solid #713200; padding: 20px;",
        });
        return;
      }else if(e.detail.password!==e.detail.confirmPassword){
        return
      } else if(!e.detail.password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)){
        return
      }
      else {
        displayStatus = "updateDataShow";

        toast.success("Data updated successfully...", {
          style: "border: 1px solid #713200; padding: 16px; color: #713200;",
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });

        let id = editUserData.id;
        console.log(id);
        let index = userData.findIndex((res) => res.id === id);
        if (index > -1) {
          fetch(`http://localhost:3000/api/user/` + editUserData.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: e.detail.firstName,
              middleName:  e.detail.middleName,
              lastName:  e.detail.lastName,
              gender:  e.detail.gender,
              dateOfBirth:  e.detail.dateOfBirth,
              email:  e.detail.email,
              password:  e.detail.password,
              address:  e.detail.address,
              street: e.detail.street,
            landmark: e.detail.landmark,
            state: e.detail.state,
            city: e.detail.city,
            pinCode: e.detail.pinCode
            }),
          })
            .then((response) => response.json())
            .then((result) => console.log(result));
        }
      }
    }
  };

  const handleUserDelete = (e) => {
    displayStatus = "formSubmit";
    toast.error("User deleted successfully...");
    console.log(e.detail);

    let index = userData.findIndex((res) => res.id === e.detail);
    let user = userData[index];
    userData.splice(index, 1);
    userData = userData;
    fetch(`http://localhost:3000/api/user/` + e.detail, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((result) => console.log(result));
  };
</script>

<Toaster />

<!-- <div class="container-fluid">
  <nav class="navbar navbar-light bg-primary">
    <span class="navbar-brand1">
      <span style="color: white; font-size: 30px;">User <b>Management</b></span>
    </span>
    <div class="container">
      <span class="navbar-brand" on:click={addUser}>Add User</span>
    </div>
  </nav>
</div> -->


  
      <div class="table-title">
        <div class="row">
          <div class="col-sm-5">
            <h2>User <b>Management</b></h2>
          </div>
          <div class="col-sm-7">
            <a href="#" class="btn btn-secondary"
              ><i class="material-icons">&#xE147;</i>
              <span on:click={addUser}>Add New User</span></a
            >
            <a href="#" class="btn btn-secondary"
              ><i class="material-icons">&#xE24D;</i>
              <span on:click={navigateToHome}>Home</span></a
            >
          </div>
        </div>
      </div>



{#if displayStatus === "addClicked" || displayStatus === "updateDataForm"}
  <!-- <Form  on:userObject={doPost}/>
{:else if displayStatus==="updateDataForm"}/> -->
  <Form
    on:onUpdate={handleUserUpdateDetail}
    on:userObject={doPost}
    {editUserData}
    {displayStatus}
    {userData}
    
  />
{:else if displayStatus === "formSubmit" || displayStatus === "default" || displayStatus === "updateDataShow" ||  displayStatus === "homeClicked"}
  <TableComponent
    on:userDelete={handleUserDelete}
    on:userUpdate={displayForm}
    {getData}
    {availableRecordPerPage}
    {userData}
    {totalRecords}
    {pageBlockToShow}
    on:page={pageNumber}
    on:prev={pageNumber}
    on:next={pageNumber}
  />
{/if}

<style>


    .table-title {
      background: #299BE4;
      color: #fff;
      padding: 16px 30px;
      margin: 0px 0px 0px;
      border-radius: 3px 3px 0 0;
    }
    .table-title h2 {
      margin: 2px 0 0;
      font-size: 24px;
    }
    .table-title .btn {
      color: #566787;
      float: right;
      font-size: 13px;
      background: #fff;
      border: none;
      min-width: 50px;
      border-radius: 2px;
      border: none;
      outline: none !important;
      margin-left: 10px;
    }
    .table-title .btn:hover,
    .table-title .btn:focus {
      color: #566787;
      background: #F2F2F2;
    }
    .table-title .btn i {
      float: left;
      font-size: 21px;
      margin-right: 5px;
    }
    .table-title .btn span {
      float: left;
      margin-top: 2px;
    }
  
</style>
