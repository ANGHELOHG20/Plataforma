package com.utp.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.utp.demo.dao.CursoDao;
import com.utp.demo.models.Curso;


@RestController
public class CursoController {

    @Autowired
    private CursoDao cursoDao;

    @RequestMapping(value = "api/cursos")
        public List<Curso> getCursos() {
        return cursoDao.getCursos();
    }

    @RequestMapping(value = "api/cursos/{id}", method=RequestMethod.DELETE)
    public void eliminarCurso(@PathVariable Long id){
        cursoDao.eliminarCurso(id);
    }
}
