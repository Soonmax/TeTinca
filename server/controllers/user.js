import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

function hasNumber(myString) {
  return /\d/.test(myString);
}

function CalcularEdad(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 16) {
    return true;
  }
  else {
    return false;
  }
}

function largoContrasena(contrasena) {
  if (contrasena.length < 6) {
    return true;
  }
  else {
    return false;
  }
}

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, birthday } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const NombreLetra = hasNumber(firstName);

    if (NombreLetra) return res.status(405).json({ message: "Nombre con numeros" });

    const ApellidoLetra = hasNumber(lastName);

    if (ApellidoLetra) return res.status(406).json({ message: "Apellido con numeros" });

    const MayoriaEdad = CalcularEdad(birthday);

    if (MayoriaEdad) return res.status(407).json({ message: "Los usuarios deben tener más de 16 años" });

    const contrasenaValida = largoContrasena(password);

    if (contrasenaValida) return res.status(408).json({ message: "El largo de la contraseña debe ser de más de 6 carácteres" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, birthday });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

