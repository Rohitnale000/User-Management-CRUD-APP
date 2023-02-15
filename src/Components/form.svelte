<script>
	import { Confirm } from 'svelte-confirm';
  import TableComponent from "./tableComponent.svelte";
  import NavigationBar from "./navigationBar.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();
  export let editUserData;
  export let displayStatus;
  console.log(editUserData);
  let userDetailObj = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword:"",
    gender: "",
    dateOfBirth: "Select Date",
    address:"",
    street:"",
    landmark:"",
    state:"",
    city:"",
    pinCode:""
  };

  if (displayStatus === "updateDataForm") {
    userDetailObj = editUserData={
      firstName: editUserData.firstName,
            middleName: editUserData.middleName,
            lastName: editUserData.lastName,
            gender: editUserData.gender,
            dateOfBirth: editUserData.dateOfBirth,
            email: editUserData.email,
            password: editUserData.password,
            confirmPassword: editUserData.password,
            address: editUserData.address,
            street: editUserData.street,
            landmark: editUserData.landmark,
            state: editUserData.state,
            city: editUserData.city,
            pinCode: editUserData.pinCode
    };
  } else {
    userDetailObj;
  }
  
  
  let errors = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword:"",
    gender: "",
    dateOfBirth: "",
    address: "",
    street:"",
    landmark: "",
    state: "",
    city: "",
    pinCode: ""

  };
  let valid = false;
  const submitButtonACtion = () => {
    valid = true;
    if (!userDetailObj.firstName.match(/^[a-zA-Z]+$/)||userDetailObj.firstName.trim().length < 1) {
            valid = false;
            errors.firstName = 'First name should have at least 1 character';
            
        }else {
            // valid = true
            errors.firstName = '';
        }

        if (userDetailObj.lastName.trim().length < 1) {
            valid = false;
            errors.lastName = 'last name should have at least 1 character';
            
        }else {
            // valid = true
            errors.lastName = '';
        }

        if ((!userDetailObj.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))) {
            valid = false;
            errors.email = 'Enter valid email address';
           
        }else {
            // valid = true
            errors.email = '';
        }

        if (!userDetailObj.password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            valid = false;
            errors.password = 'Password should have at least one capital small and special letter';
            
        }else {
            // valid = true
            errors.password = '';
        }

        if(userDetailObj.password !== userDetailObj.confirmPassword){
          valid = false;
          errors.confirmPassword = 'Password and confirm-password are not match';
  
        }else{
            //  valid = true
            errors.confirmPassword = '';
        }

        var option=document.getElementsByName('gender');
     
      if (!(option[0].checked || option[1].checked|| option[2].checked)) {
        errors.gender=("Please Select Your Gender");
          valid= false;
        }
        else{
          errors.gender=''
        }


        if (userDetailObj.address.match(/[^a-zA-Z0-9]/)||userDetailObj.address.trim().length < 1) {
            valid = false;
            errors.address = 'Enter valid apartment no or name';
            
        }else {
            // valid = true
            errors.address = '';
        }

        if (!userDetailObj.street.match(/^[a-zA-Z]+$/)||userDetailObj.street.trim().length < 1) {
            valid = false;
            errors.street = 'Enter valid street name or Locality';
            
        }else {
            // valid = true
            errors.street = '';
        }


    if ( displayStatus === "updateDataForm") {
          dispatch("onUpdate", userDetailObj);
        } else {
          dispatch("userObject", userDetailObj);
        }
  };

  
  
  
 
//  function containsAlphabets(str) {
//     const alpha = /^[a-zA-Z]+$/;
//     return alpha.test(str);
//   }
//   var validation = (field) => {
//     if (field.trim() === "" || !containsAlphabets(field)) {
//       return false;
//     } else {
//       return true;
//     }
//   };
//   var validateEmail = (mail) => {
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//       return true;
//     }
//     return false;
//   };
 
//   function checkPassword(str) {
//     var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//     return re.test(str);
//   }


</script>

<Toaster/>




<h3>Registration</h3>
<div class="container col-8" id="mainContainer">
  <div class="form-row ">
    <div class="form-group col-md-6 font-weight-bold">
   <label for="" class="allFormLebeal">First Name <span>*</span></label>
    <input
      bind:value={userDetailObj.firstName}
      type="text"
      placeholder="Enter First Name" 
     class="form-control"
    /> 
    <span class="error">{errors.firstName}</span>
  </div>
 
  <div class="form-group col-md-6 font-weight-bold">
    <label for="" class="allFormLebeal">Middle Name</label>
    <input
      bind:value={userDetailObj.middleName}
      class="form-control"
      type="text"
      placeholder="Enter Middle Name"
    /> 
  </div>
  </div>

  <div class="form-row ">
  <div class="form-group col-md-6 font-weight-bold">
    <label for="" class="allFormLebeal">Last Name <span>*</span></label>
    <input
      bind:value={userDetailObj.lastName}
      class="form-control"
      type="text"
      placeholder="Enter Last Name"
      
    />
     <span class="error">{errors.lastName}</span>
  </div>
  <div class="form-group col-md-6 font-weight-bold">
    <label for="" class="allFormLebeal">Email address <span>*</span></label>
    <input
      bind:value={userDetailObj.email}
      type="email"
      class="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder="Enter email"
    />
    <span class="error">{errors.email}</span>
  </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6 font-weight-bold">
    <label for="" class="allFormLebeal">Password <span>*</span></label>
    <input
      bind:value={userDetailObj.password}
      type="password"
      class="form-control"
      id="exampleInputPassword1"
      placeholder="Password" 
    />
    <span class="error">{errors.password}</span>
  </div>
  <div class="form-group col-md-6 font-weight-bold">
    <label for="" class="allFormLebeal">Confirm-Password <span>*</span></label>
    <input
      bind:value={userDetailObj.confirmPassword}
      type="password"
     class="form-control"
      id="examldldldj"
      placeholder="Confirm-Password" 
    />
    <span class="error">{errors.confirmPassword}</span>
  </div>
</div>
<div class="form-row">
  <div class="form-group col-md-6 font-weight-bold">
    
    <label for="gender">Gender<span class="req">*</span></label>
    
    <input type="radio" value="Male" name="gender" bind:group={userDetailObj.gender} id="check"/> Male
    <input type="radio" value="Female" name="gender" bind:group={userDetailObj.gender} id="check1"/> Female
    <input type="radio" value="Other"name="gender" bind:group={userDetailObj.gender} id="check3"/> Other <br> 
    <span class="error">{errors.gender}</span>
  </div>
  
  <div class="form-group col-md-6 font-weight-bold">
    <label for="dateOfBirth" class="allFormLebeal">Date of Birth <span>*</span></label>
    <input
      bind:value={userDetailObj.dateOfBirth}
      type="date"
      class="form-control"
      name="dateOfBirth"
      id=""
      min="1990-01-01" 
      max="2005-12-31"
    />
  
   </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4 font-weight-bold">
    <label for="" class="allFormLebeal">Address <span>*</span></label>
    <input
      bind:value={userDetailObj.address}
      class="form-control"
      type="text"
      placeholder="Enter Apartment Name/NO"
    
    />
    <span class="error">{errors.address}</span>
    </div>
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">Street Name or Locality <span>*</span></label>
      <input
        bind:value={userDetailObj.street}
        class="form-control"
        type="text"
        placeholder="Enter street name or locality"
      
      />
      <span class="error">{errors.street}</span>
      </div>
      <div class="form-group col-md-4 font-weight-bold">
        <label for="" class="allFormLebeal">Landmark <span>*</span></label>
        <input
          bind:value={userDetailObj.landmark}
          class="form-control"
          type="text"
          placeholder="Enter Landmark"
        />
      </div>
  </div>


  <div class="form-row">
    <div class="form-group col-md-4 font-weight-bold">
      <label for="" class="allFormLebeal">State <span>*</span></label>

      <select
          type="text"
          class="form-control"
          id="state"
          placeholder="Mumabai Maharashtra"
          bind:value={userDetailObj.state}
          >
          <option value="" disabled selected>Select your State</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
          <option value="Daman and Diu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadweep">Lakshadweep</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="Himachal Pradesh">Himachal Pradesh</option>
          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Uttarakhand">Uttarakhand</option>
          <option value="West Bengal">West Bengal</option>
        </select>

  </div>
  <div class="form-group col-md-4 font-weight-bold">
    <label for="" class="allFormLebeal">City <span>*</span></label>
    <select  type="text"
    class="form-control"
    id="state"
    placeholder="Mumabai Maharashtra"
    bind:value={userDetailObj.city}>

      <option value="" disabled selected>Select City</option>
      <option value="Achalpur">Achalpur</option>
      <option value="Ahiri">Ahiri</option>
      <option value="Ahmadnagar">Ahmadnagar</option>
      <option value="Ahmadpur">Ahmadpur</option>
      <option value="Airoli">Airoli</option>
      <option value="Ajra">Ajra</option>
      <option value="Akalkot">Akalkot</option>
      <option value="Akola">Akola</option>
      <option value="Akot">Akot</option>
      <option value="Alandi">Alandi</option>
      <option value="Alibag">Alibag</option>
      <option value="Allapalli">Allapalli</option>
      <option value="Amalner">Amalner</option>
      <option value="Amarnath">Amarnath</option>
      <option value="Ambad">Ambad</option>
      <option value="Ambajogai">Ambajogai</option>
      <option value="Amravati">Amravati</option>
      <option value="Amravati Division">Amravati Division</option>
      <option value="Anjangaon">Anjangaon</option>
      <option value="Anshing">Anshing</option>
      <option value="Arangaon">Arangaon</option>
      <option value="Artist Village">Artist Village</option>
      <option value="Arvi">Arvi</option>
      <option value="Ashta">Ashta</option>
      <option value="Ashti">Ashti</option>
      <option value="Aurangabad">Aurangabad</option>
      <option value="Ausa">Ausa</option>
      <option value="Badlapur">Badlapur</option>
      <option value="Balapur">Balapur</option>
      <option value="Ballalpur">Ballalpur</option>
      <option value="Baramati">Baramati</option>
      <option value="Barsi">Barsi</option>
      <option value="Basmat">Basmat</option>
      <option value="Beed">Beed</option>
      <option value="Bhandara">Bhandara</option>
      <option value="Bhayandar">Bhayandar</option>
      <option value="Bhigvan">Bhigvan</option>
      <option value="Bhiwandi">Bhiwandi</option>
      <option value="Bhor">Bhor</option>
      <option value="Bhudgaon">Bhudgaon</option>
      <option value="Bhum">Bhum</option>
      <option value="Bhusaval">Bhusaval</option>
      <option value="Bid">Bid</option>
      <option value="Biloli">Biloli</option>
      <option value="Boisar">Boisar</option>
      <option value="Borivli">Borivli</option>
      <option value="Buldana">Buldana</option>
      <option value="Chakan">Chakan</option>
      <option value="Chalisgaon">Chalisgaon</option>
      <option value="Chanda">Chanda</option>
      <option value="Chandor">Chandor</option>
      <option value="Chandrapur">Chandrapur</option>
      <option value="Chandur">Chandur</option>
      <option value="Chandur Bazar">Chandur Bazar</option>
      <option value="Chicholi">Chicholi</option>
      <option value="Chikhli">Chikhli</option>
      <option value="Chinchani">Chinchani</option>
      <option value="Chiplun">Chiplun</option>
      <option value="Chopda">Chopda</option>
      <option value="Dabhol">Dabhol</option>
      <option value="Dahanu">Dahanu</option>
      <option value="Darwha">Darwha</option>
      <option value="Daryapur">Daryapur</option>
      <option value="Dattapur">Dattapur</option>
      <option value="Daulatabad">Daulatabad</option>
      <option value="Daund">Daund</option>
      <option value="Dehu">Dehu</option>
      <option value="Deolali">Deolali</option>
      <option value="Deoli">Deoli</option>
      <option value="Deulgaon Raja">Deulgaon Raja</option>
      <option value="Dharangaon">Dharangaon</option>
      <option value="Dharmabad">Dharmabad</option>
      <option value="Dharur">Dharur</option>
      <option value="Dhule">Dhule</option>
      <option value="Dhulia">Dhulia</option>
      <option value="Diglur">Diglur</option>
      <option value="Digras">Digras</option>
      <option value="Dombivli">Dombivli</option>
      <option value="Dondaicha">Dondaicha</option>
      <option value="Dudhani">Dudhani</option>
      <option value="Durgapur">Durgapur</option>
      <option value="Erandol">Erandol</option>
      <option value="Faizpur">Faizpur</option>
      <option value="Gadchiroli">Gadchiroli</option>
      <option value="Gadhinglaj">Gadhinglaj</option>
      <option value="Gangakher">Gangakher</option>
      <option value="Gangapur">Gangapur</option>
      <option value="Gevrai">Gevrai</option>
      <option value="Ghatanji">Ghatanji</option>
      <option value="Ghoti Budrukh">Ghoti Budrukh</option>
      <option value="Ghugus">Ghugus</option>
      <option value="Gondiya">Gondiya</option>
      <option value="Goregaon">Goregaon</option>
      <option value="Guhagar">Guhagar</option>
      <option value="Hadgaon">Hadgaon</option>
      <option value="Harnai">Harnai</option>
      <option value="Hinganghat">Hinganghat</option>
      <option value="Hingoli">Hingoli</option>
      <option value="Hirapur Hamesha">Hirapur Hamesha</option>
      <option value="Ichalkaranji">Ichalkaranji</option>
      <option value="Igatpuri">Igatpuri</option>
      <option value="Indapur">Indapur</option>
      <option value="Jaisingpur">Jaisingpur</option>
      <option value="Jalgaon">Jalgaon</option>
      <option value="Jalgaon Jamod">Jalgaon Jamod</option>
      <option value="Jalna">Jalna</option>
      <option value="Jawhar">Jawhar</option>
      <option value="Jejuri">Jejuri</option>
      <option value="Jintur">Jintur</option>
      <option value="Junnar">Junnar</option>
      <option value="Kagal">Kagal</option>
      <option value="Kalamb">Kalamb</option>
      <option value="Kalamnuri">Kalamnuri</option>
      <option value="Kalas">Kalas</option>
      <option value="Kalmeshwar">Kalmeshwar</option>
      <option value="Kalundri">Kalundri</option>
      <option value="Kalyan">Kalyan</option>
      <option value="Kamthi">Kamthi</option>
      <option value="Kandri">Kandri</option>
      <option value="Kankauli">Kankauli</option>
      <option value="Kannad">Kannad</option>
      <option value="Karad">Karad</option>
      <option value="Karanja">Karanja</option>
      <option value="Karjat">Karjat</option>
      <option value="Karmala">Karmala</option>
      <option value="Kati">Kati</option>
      <option value="Katol">Katol</option>
      <option value="Khadki">Khadki</option>
      <option value="Khamgaon">Khamgaon</option>
      <option value="Khapa">Khapa</option>
      <option value="Kharakvasla">Kharakvasla</option>
      <option value="Khed">Khed</option>
      <option value="Khetia">Khetia</option>
      <option value="Khopoli">Khopoli</option>
      <option value="Khuldabad">Khuldabad</option>
      <option value="Kinwat">Kinwat</option>
      <option value="Kodoli">Kodoli</option>
      <option value="Kolhapur">Kolhapur</option>
      <option value="Kondalwadi">Kondalwadi</option>
      <option value="Kopargaon">Kopargaon</option>
      <option value="Koradi">Koradi</option>
      <option value="Koregaon">Koregaon</option>
      <option value="Koynanagar">Koynanagar</option>
      <option value="Kudal">Kudal</option>
      <option value="Kurandvad">Kurandvad</option>
      <option value="Kurduvadi">Kurduvadi</option>
      <option value="Lanja">Lanja</option>
      <option value="Lasalgaon">Lasalgaon</option>
      <option value="Latur">Latur</option>
      <option value="Lohogaon">Lohogaon</option>
      <option value="Lonar">Lonar</option>
      <option value="Lonavla">Lonavla</option>
      <option value="Mahabaleshwar">Mahabaleshwar</option>
      <option value="Mahad">Mahad</option>
      <option value="Maindargi">Maindargi</option>
      <option value="Majalgaon">Majalgaon</option>
      <option value="Makhjan">Makhjan</option>
      <option value="Malegaon">Malegaon</option>
      <option value="Malkapur">Malkapur</option>
      <option value="Malvan">Malvan</option>
      <option value="Manchar">Manchar</option>
      <option value="Mangrul Pir">Mangrul Pir</option>
      <option value="Manmad">Manmad</option>
      <option value="Manor">Manor</option>
      <option value="Mansar">Mansar</option>
      <option value="Manwat">Manwat</option>
      <option value="Matheran">Matheran</option>
      <option value="Mehekar">Mehekar</option>
      <option value="Mhasla">Mhasla</option>
      <option value="Mhasvad">Mhasvad</option>
      <option value="Mohpa">Mohpa</option>
      <option value="Moram">Moram</option>
      <option value="Morsi">Morsi</option>
      <option value="Mowad">Mowad</option>
      <option value="Mudkhed">Mudkhed</option>
      <option value="Mukher">Mukher</option>
      <option value="Mul">Mul</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Mumbai Suburban">Mumbai Suburban</option>
      <option value="Murbad">Murbad</option>
      <option value="Murgud">Murgud</option>
      <option value="Murtajapur">Murtajapur</option>
      <option value="Murud">Murud</option>
      <option value="Nagothana">Nagothana</option>
      <option value="Nagpur">Nagpur</option>
      <option value="Nagpur Division">Nagpur Division</option>
      <option value="Naldurg">Naldurg</option>
      <option value="Nanded">Nanded</option>
      <option value="Nandgaon">Nandgaon</option>
      <option value="Nandura Buzurg">Nandura Buzurg</option>
      <option value="Nandurbar">Nandurbar</option>
      <option value="Nashik">Nashik</option>
      <option value="Nashik Division">Nashik Division</option>
      <option value="Navi Mumbai">Navi Mumbai</option>
      <option value="Neral">Neral</option>
      <option value="Nilanga">Nilanga</option>
      <option value="Nipani">Nipani</option>
      <option value="Osmanabad">Osmanabad</option>
      <option value="Ozar">Ozar</option>
      <option value="Pachora">Pachora</option>
      <option value="Paithan">Paithan</option>
      <option value="Palghar">Palghar</option>
      <option value="Panchgani">Panchgani</option>
      <option value="Pandharpur">Pandharpur</option>
      <option value="Panhala">Panhala</option>
      <option value="Panvel">Panvel</option>
      <option value="Parbhani">Parbhani</option>
      <option value="Parli Vaijnath">Parli Vaijnath</option>
      <option value="Parola">Parola</option>
      <option value="Partur">Partur</option>
      <option value="Patan">Patan</option>
      <option value="Pathardi">Pathardi</option>
      <option value="Pathri">Pathri</option>
      <option value="Patur">Patur</option>
      <option value="Pawni">Pawni</option>
      <option value="Pen">Pen</option>
      <option value="Phaltan">Phaltan</option>
      <option value="Pimpri">Pimpri</option>
      <option value="Pipri">Pipri</option>
      <option value="Powai">Powai</option>
      <option value="Pulgaon">Pulgaon</option>
      <option value="Pune">Pune</option>
      <option value="Pune Division">Pune Division</option>
      <option value="Purna">Purna</option>
      <option value="Pusad">Pusad</option>
      <option value="Rahimatpur">Rahimatpur</option>
      <option value="Rahuri">Rahuri</option>
      <option value="Raigarh">Raigarh</option>
      <option value="Rajapur">Rajapur</option>
      <option value="Rajgurunagar">Rajgurunagar</option>
      <option value="Rajur">Rajur</option>
      <option value="Rajura">Rajura</option>
      <option value="Ramtek">Ramtek</option>
      <option value="Ratnagiri">Ratnagiri</option>
      <option value="Raver">Raver</option>
      <option value="Revadanda">Revadanda</option>
      <option value="Risod">Risod</option>
      <option value="Roha">Roha</option>
      <option value="Sangamner">Sangamner</option>
      <option value="Sangli">Sangli</option>
      <option value="Sangola">Sangola</option>
      <option value="Saoner">Saoner</option>
      <option value="Sasvad">Sasvad</option>
      <option value="Satana">Satana</option>
      <option value="Satara">Satara</option>
      <option value="Satara Division">Satara Division</option>
      <option value="Savantvadi">Savantvadi</option>
      <option value="Savda">Savda</option>
      <option value="Selu">Selu</option>
      <option value="Shahada">Shahada</option>
      <option value="Shahapur">Shahapur</option>
      <option value="Shegaon">Shegaon</option>
      <option value="Shiraguppi">Shiraguppi</option>
      <option value="Shirdi">Shirdi</option>
      <option value="Shirgaon">Shirgaon</option>
      <option value="Shirpur">Shirpur</option>
      <option value="Shirwal">Shirwal</option>
      <option value="Shivaji Nagar">Shivaji Nagar</option>
      <option value="Shrigonda">Shrigonda</option>
      <option value="Sillod">Sillod</option>
      <option value="Sindhudurg">Sindhudurg</option>
      <option value="Sindi">Sindi</option>
      <option value="Sinnar">Sinnar</option>
      <option value="Sirur">Sirur</option>
      <option value="Solapur">Solapur</option>
      <option value="Sonegaon">Sonegaon</option>
      <option value="Soygaon">Soygaon</option>
      <option value="Srivardhan">Srivardhan</option>
      <option value="Surgana">Surgana</option>
      <option value="Talegaon Dabhade">Talegaon Dabhade</option>
      <option value="Taloda">Taloda</option>
      <option value="Tarapur">Tarapur</option>
      <option value="Tasgaon">Tasgaon</option>
      <option value="Telhara">Telhara</option>
      <option value="Thane">Thane</option>
      <option value="Trimbak">Trimbak</option>
      <option value="Tuljapur">Tuljapur</option>
      <option value="Tumsar">Tumsar</option>
      <option value="Udgir">Udgir</option>
      <option value="Ulhasnagar">Ulhasnagar</option>
      <option value="Umarga">Umarga</option>
      <option value="Umarkhed">Umarkhed</option>
      <option value="Umred">Umred</option>
      <option value="Uran">Uran</option>
      <option value="Vada">Vada</option>
      <option value="Vaijapur">Vaijapur</option>
      <option value="Varangaon">Varangaon</option>
      <option value="Vasind">Vasind</option>
      <option value="Vengurla">Vengurla</option>
      <option value="Virar">Virar</option>
      <option value="Vite">Vite</option>
      <option value="Wadgaon">Wadgaon</option>
      <option value="Wai">Wai</option>
      <option value="Wani">Wani</option>
      <option value="Wardha">Wardha</option>
      <option value="Warora">Warora</option>
      <option value="Warud">Warud</option>
      <option value="Washim">Washim</option>
      <option value="Yaval">Yaval</option>
      <option value="Yavatmal">Yavatmal</option>
      <option value="Yeola">Yeola</option>
  </select>
  </div>
  <div class="form-group col-md-4 font-weight-bold">
    <label for="" class="allFormLebeal">PinCode <span>*</span></label>
    <input
    bind:value={userDetailObj.pinCode}
    class="form-control"
    type="text"
    placeholder="Enter pin code"
    
  />
  </div>
</div>



  <button
    type="submit"
    class="btn btn-primary btn-lg"
    
    on:click={submitButtonACtion}>Submit</button
  >
</div>

<style>
  .allFormLebeal{
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 0px;
    margin-top: 0px;
  }
 #mainContainer{
  margin-top: 20px;
 }

 h3{
  text-align: center;
  margin: 15px;
 }
 span{
  color: red;
 }


</style>
