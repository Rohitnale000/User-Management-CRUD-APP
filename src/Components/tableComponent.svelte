<script>
 
  import {createEventDispatcher, onMount} from'svelte';
  import { Confirm } from 'svelte-confirm'

  const dispatch = createEventDispatcher();
  export let totalRecords
  export let userData;
  export let getData
  export let pageBlockToShow
  export let availableRecordPerPage
  console.log(userData);


  const handlePrev = () => {
    dispatch("prev", { message: "prev" });
  };
  const handleNext = () => {
    dispatch("next", { message: "next" });
  };
  const handlePage = (page) => {
    if (page===0) {
      page=1
    } else {
      page=page
    }
    dispatch("page", page);
  };
  
  onMount(()=>{
  getData();
  })

  const handleUpdateEvent = (data) =>{
    dispatch('userUpdate',data);
  }
  const handleDeleteEvent = (data)=>{
    dispatch('userDelete', data.id);
  }
</script>


<!-- <div class="row">
    <table class="table table-striped table-hover table-bordered" style="border: 2px;" id="dtBasicExample">
      <thead>
        <tr>
          
          <th scope="col">Full Name</th>
          <th scope="col">Email</th>
          <th scope="col">Gender</th>
          <th scope="col">Address</th>
          <th scope="col">Date Of Birth</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each userData as item }
        <tr>
          
          <td>{item.firstName} {item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          <td>{item.address}</td>
          <td>{item.dateOfBirth}</td>
          <td>

            <Confirm  confirmTitle="Update"
            cancelTitle="Cancel"
            let:confirm="{confirmThis}" >

              <i style=" color: #2196F3; cursor: pointer; font-size: 30px;" class="material-icons" on:click="{() => confirmThis(handleUpdateEvent, item)}">&#xE8B8;</i>

              <span slot="title">
               Do you want to update this record ?
              </span>
              <span slot="description">
                You won't be able to revert this!
              </span>

            </Confirm>


            <Confirm  confirmTitle="Delete"
            cancelTitle="Cancel"
            let:confirm="{confirmThis}" >
          
            <i  style=" color: red; cursor: pointer; font-size: 30px;" class="material-icons" on:click="{() => confirmThis(handleDeleteEvent, item)}">&#xE872;</i>
           
            <span slot="title">
              Do you want to Delete this record ?
             </span>
             <span slot="description">
               You won't be able to revert this!
             </span>

            </Confirm>

           
           
          </td>
        </tr>
        {/each}
       
      </tbody>
    </table>
  </div> -->
  

  <div class="table-wrapper">
  <table class="table table-striped table-hover">
    <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Date Of Birth</th>
          <th>Action</th>
        </tr>
    </thead>
     <tbody>
        {#each userData as item }
        <tr>
          <td>{item.firstName} {item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          <td>{item.address},{item.street} {item.landmark},{item.state} {item.city},{item.pinCode}</td>
          <td>{item.dateOfBirth}</td>
          <td>

            <Confirm  confirmTitle="Update"
            cancelTitle="Cancel"
            let:confirm="{confirmThis}" >

            <a href="#" class="settings" title="Update" data-toggle="tooltip"><i class="material-icons" on:click="{() => confirmThis(handleUpdateEvent, item)}">&#xE8B8;</i></a>

             
              <span slot="title">
               Do you want to update this record ?
              </span>
              <span slot="description">
                You won't be able to revert this!
              </span>

            </Confirm>


            <Confirm  confirmTitle="Delete"
            cancelTitle="Cancel"
            let:confirm="{confirmThis}" >
          
            <!-- <i class="material-icons" >&#xE872;</i> -->
           
            <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons" on:click="{() => confirmThis(handleDeleteEvent, item)}">&#xE5C9;</i></a>


            
            <span slot="title">
              Do you want to Delete this record ?
             </span>
             <span slot="description">
               You won't be able to revert this!
             </span>
            </Confirm>
          </td>
        </tr>
        {/each}
      </tbody>
</table>
<div class="clearfix">
  <div class="hint-text">Showing <b>{availableRecordPerPage}</b> out of <b>{totalRecords}</b> entries</div>
  <ul class="pagination">
      <li class="page-item disabled"><a href="#" on:click={()=>{handlePrev()}}>Previous</a></li>
      {#each Array(pageBlockToShow) as pbs, i }
      <li class="page-item"><a href="#" class="page-link" on:click={()=>{
        
        handlePage(i);
      }} >{i++ +1}</a></li>
      {/each}
     
      <li class="page-item"><a href="#" class="page-link" on:click={()=>{
        handleNext();
      }}>Next</a></li>
  </ul>
</div>
</div>


<style>
  body {
    color: #566787;
    background: #FFFFFF;
    font-family: "Varela Round", sans-serif;
    font-size: 13px;
    padding: 0%;
  }
  .table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 8px 25px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }
  table.table tr th,
  table.table tr td {
    border-color: #E9E9E9;
    padding: 12px 15px;
    vertical-align: middle;
  }
  table.table tr th:first-child {
    width: 150px;
  }
  table.table tr th:last-child {
    width: 100px;
  }
  table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #FCFCFC;
  }
  table.table-striped.table-hover tbody tr:hover {
    background: #F5F5F5;
  }
  table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
  }
  table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
  }
  table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
  }
  table.table td a:hover {
    color: #2196F3;
  }
  table.table td a.settings {
    color: #2196F3;
  }
  table.table td a.delete {
    color: #F44336;
  }
  table.table td i {
    font-size: 19px;
  }
  table.table {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }
  
</style>

  