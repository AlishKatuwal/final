
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';  
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/store/authSlice/index';
import { useToast } from '@/hooks/use-toast';
const registerFormControl = [
  {
    name: 'userName',
    type: 'text',
    placeholder: 'Enter your username',
    label: 'Username',
    componentType: 'input',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    label: 'Email',
    componentType: 'input',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    componentType: 'input',
  }
];

const initialState = {
  userName: '',
  email: '',
  password: '',
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
const dispatch = useDispatch();
const navigate = useNavigate();
const { toast } = useToast();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message,
        });
        navigate('/auth/login');
  } else{
    toast({
      title : data?.payload?.message,
      variant: "destructive",
    });
  }
}



);
}
  console.log(formData);

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign Up</h1>
        <p className='mt-2'>
          Already Have an Account? 
          <Link className="font-medium text-primary hover:underline" to='/auth/login'>
            Login
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={registerFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Create Account"
      />
    </div>
  );
};

export default Register;

