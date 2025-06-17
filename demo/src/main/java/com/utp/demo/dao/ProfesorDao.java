package com.utp.demo.dao;

import java.util.List;

import com.utp.demo.models.Profesor;

public interface ProfesorDao {

    List<Profesor> getProfesores();

    void eliminarProfesor(Long id);

}
