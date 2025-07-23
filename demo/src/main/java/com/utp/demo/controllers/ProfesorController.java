package com.utp.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.utp.demo.dao.ProfesorDao;
import com.utp.demo.models.Profesor;

import org.springframework.web.bind.annotation.*;


@RestController
public class ProfesorController {

    @Autowired
    private ProfesorDao profesorDao;
    

    @GetMapping("api/profesores")
    public List<Profesor> getProfesor(@RequestParam(required = false) String search) {
        if (search != null && !search.isEmpty()) {
            return profesorDao.buscarPorNombre(search);
        }
            return profesorDao.getProfesores();
    }

    @RequestMapping(value = "api/profesores", method = RequestMethod.POST)
    public void registrarProfesor(@RequestBody Profesor profesor) {
            profesorDao.registrar(profesor);
    }

    @RequestMapping(value = "api/profesores/{id}", method=RequestMethod.DELETE)
    public void eliminarProfesor(@PathVariable Long id){
        profesorDao.eliminarProfesor(id);
    }
    
    
}
