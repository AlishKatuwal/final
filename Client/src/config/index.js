const registerFormControl = [
    {
      name: 'userName',
      type: 'text',
      placeholder: 'Enter your username',
      label: 'Username',
      componentType: 'input',  // Could also be 'textarea' if you want a textarea field
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
  const shoeFormControl = [

    {
      name: 'image',
      type: 'file',
      placeholder: 'Upload image',
      label: 'Image',
      componentType: 'file',
    },
    {
      name: 'title',
      type: 'text',
      placeholder: 'Enter product name',
      label: 'Product Name',
      componentType: 'input',
    },
    {
      name: 'description',
      type: 'text',
      placeholder: 'Enter product description',
      label: 'Description',
      componentType: 'textarea',
    },
    {
      name: 'price',
      type: 'number',
      placeholder: 'Enter product price',
      label: 'Price',
      componentType: 'input',
    },
    {
      name: 'productSize',
      type: 'select',
      label: 'size',
      componentType: 'select',
      options: [
        { id: '6', name: '6' },
        { id: '7', name: '7' },
        { id: '8', name: '8' },
        { id: '9', name: '9' },
        { id: '10', name: '10' },
        { id: '11', name: '11' },
        { id: '12', name: '12' },
      ],
    },
    {
      label: 'Color',
      name: 'color',
      type: 'text',
      componentType: 'input',
    },
    {
      label: 'Brand',
      name: 'brand',
      type: 'select',
      componentType: 'select',
      options: [
        { id: 'nike', name: 'Nike' },
        { id: 'adidas', name: 'Adidas' },
        { id: 'puma', name: 'Puma' },
        { id: 'reebok', name: 'Reebok' },
        { id: 'converse', name: 'Converse' },
        { id: 'vans', name: 'Vans' },
      ],
    },
  ];
  
  const initialFormData = {
    image : null,
    title: '',
    description: '',
    price: '',
    size: '',
    color: '',
    brand: '', // Ensure this is initialized
  };
  
  
  export { registerFormControl, shoeFormControl };