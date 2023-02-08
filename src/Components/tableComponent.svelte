<script>
  import { fly } from 'svelte/transition';
  import {createEventDispatcher, onMount} from'svelte';
  const dispatch = createEventDispatcher();
  
  export let userData;
  export let getData
 

  console.log(userData);
  
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


<div class="row">
    <table class="table table-striped w-lg" style="border: 2px;" id="dtBasicExample">
      <thead>
        <tr>
          
          <th scope="col">First</th>
          <th scope="col">Middle</th>
          <th scope="col">Last</th>
          <th scope="col">Email</th>
          <th scope="col">Gender</th>
          <th scope="col">Address</th>
          <th scope="col">Date Of Birth</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {#each userData as item }
        <tr transition:fly="{{ y: 200, duration: 2000 }}">
          
          <td>{item.firstName}</td>
          <td>{item.middleName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          <td>{item.address}</td>
          <td>{item.dateOfBirth}</td>
          <td>
            <button type="button" class="btn btn-outline-success" on:click={handleUpdateEvent(item)}>Update</button>
            <button type="button" class="btn btn-outline-danger" on:click={handleDeleteEvent(item)}>Delete</button>
          </td>
        </tr>
        {/each}
       
      </tbody>
    </table>
  </div>
  

  <style>

#myTable{
    font-size: 20px;
  }

.row{
  text-align: center;
}

  </style>