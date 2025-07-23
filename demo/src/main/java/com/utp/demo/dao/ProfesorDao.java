package com.utp.demo.dao;

import java.util.List;

import com.utp.demo.models.Profesor;
import com.utp.demo.models.Usuario;

public interface ProfesorDao {

    List<Profesor> getProfesores();

    void eliminarProfesor(Long id);

    List<Profesor> buscarPorNombre(String nombre);

    void registrar(Profesor profesor);

}
