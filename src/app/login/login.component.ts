import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private route:Router){}


  

  ngOnInit(): void {
    const localData=localStorage.getItem('signUpUsers');
    if(localData!=null){
      this.signupUsers=JSON.parse(localData);
    }
  }





















  signupUsers:any[]=[];
  
  signupObj:any ={
    userName:'',
    email:'',
    password:''
  };

 

  

  loginObj:any={
    userName:'',
    password:''

  };
  
 
  onSignUp(){
  

    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj ={
      userName:'',
      email:'',
      password:''
    };
  
  }
  onLogin(){
    //debugger
    const isUserExist= this.signupUsers.find(m=>m.userName == this.loginObj.userName
       && m.password == this.loginObj.password);

       if(isUserExist !=undefined){
        alert("User Login Successfully")
        this.route.navigate(['/form']);


       }
       else{
        alert("Wrong Credentials");
       }

  }

}
