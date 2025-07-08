package com.utp.demo.dao;

import com.utp.demo.models.Curso;
import java.util.List;

public interface CursoDao {

    List<Curso> getCursos();

    void eliminarCurso(Long id);

}
