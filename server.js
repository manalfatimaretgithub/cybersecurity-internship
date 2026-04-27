const express = require('express');
const helmet = require('helmet');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(helmet());
app.use(express.json());

app.get('/', (req,res)=> {
    res.send('Hello! Server is Working');

});

app.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    if(!validator.isEmail(email)){
        return res.status(400).send('INVALID EMAIL!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Original Password:', password);
    console.log('Hashed password:', hashedPassword);

    res.send('Valid Email, Password Hashed & Registered!!')
});

app.post('/login', async (req, res)=>{
    const{email,password}=req.body;
    if(email==='ali@test.com' && password=== '12345'){
        const token =jwt.sign(
            {email: email },
            'mySecretKey123',
            {expiresIn: '1h'}
        );
        res.send({ message: 'Login successful!', token: token});
    } else {
        res.status(400).send('Invalid Email or Password');
    }
});

app.listen(3000, () => {
    console.log('Server is working on 3000 port');
});
