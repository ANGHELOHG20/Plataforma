package com.utp.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.utp.demo.dao.ProfesorDao;
import com.utp.demo.models.Profesor;

import org.springframework.web.bind.annotation.*;


@RestController
public class ProfesorController {

    @Autowired
    private ProfesorDao profesorDao;
    

    @RequestMapping(value = "api/profesores")
        public List<Profesor> getProfesores() {
        return profesorDao.getProfesores();
    }

    @RequestMapping(value = "api/profesores/{id}", method=RequestMethod.DELETE)
    public void eliminarProfesor(@PathVariable Long id){
        profesorDao.eliminarProfesor(id);
    }
    
    
}
