const { app, shell ,  BrowserWindow , ipcMain} = require('electron');

const bcrypt = require('bcrypt');

const sqlite3 = require('sqlite3').verbose();

const createReport = require('docx-templates');

let windowsMachine = false;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

let db;


let directory = '';

if (process.platform !== 'darwin') {
  windowsMachine = true;
}

if (windowsMachine) {
  directory = `C:/vinculacion/`;
}

const openDB = async() => {

  let url = './model/db/vinculacion.db';

  if(windowsMachine) {
    url = 'C:/vinculacion/database/vinculacion.db';
  }

  db = new sqlite3.Database(`${url}`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to database.');
    }
    
  });
}

const createWindow = async ()=> {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    resizable:false
  })

  openDB();



 

  win.loadFile(`${__dirname}/dist/vinculacionisc/index.html`);


  // only on dev ... win.webContents.openDevTools()


  win.on('closed', () => {

    win = null
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', () => {


  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('crear-usuario', async(event, _usuario) => {

   

    try {

      openDB();

      const saltrounds = 10;

      bcrypt.hash(_usuario.password, saltrounds, (err, hash) => {

        let consultaSQL = `INSERT INTO usuarios(nombre,apellidoPaterno,apellidoMaterno,password,puesto) VALUES 
        ("${_usuario.nombreCompleto.nombre}","${_usuario.nombreCompleto.apellidoPaterno}","${_usuario.nombreCompleto.apellidoMaterno}",
          "${hash}", "${_usuario.puesto}");`;
        
        db.run(consultaSQL, (err) => {
          if (err) {
            event.returnValue = "Error en la insercion";
            console.log(err);
          } else {
            event.returnValue = "Exito!"
            db.close();
          }
        });


      });

    
     

    } catch(err) {
      throw err;
    }
})  


ipcMain.on('login', async(event, usuario, password) => {
    try {
      openDB(); 
      if (!usuario || !password) {
        event.returnValue = false;
      }
      if (usuario == 'admin' && password == 'admin') {
        event.returnValue = 'admin';
      } else {
        let consultaSQL = `SELECT password FROM usuarios WHERE nombre = "${usuario}";`;
        db.get(consultaSQL, (err, row) => {
          if (err) {
            event.returnValue = false;
          } else {
            if (row === undefined) {
              event.returnValue = false;
              return;
            }
            bcrypt.compare(password, row.password , (err,res) => {
              if (err) {
                event.returnValue = false;
                return;
                
              } else {
                db.close();
                event.returnValue = res;
              }
            });
  
          }

        });
      }


    } catch(err) {
      event.returnValue = false;
    }
})

ipcMain.on('get-usuarios', async (event) => {
  try {

      openDB();

      let consultaSQL = `SELECT id,puesto,nombre,apellidoPaterno,apellidoMaterno FROM usuarios
                ORDER BY apellidoPaterno`;

      let usuarios = [];
      
      db.all(consultaSQL, (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          usuarios.push(row)
        });

        event.returnValue = usuarios;
      });

      db.close();
  }catch(err) {
    throw err;
  }


  ipcMain.on('update-usuario', async (event, usuario, id) => {

    try{

      openDB();

      let consultaSQL = `UPDATE usuarios SET nombre = "${usuario.nombreCompleto.nombre}", apellidoPaterno = "${usuario.nombreCompleto.apellidoPaterno}", 
      apellidoMaterno = "${usuario.nombreCompleto.apellidoMaterno}" WHERE id = ${id}; `

      db.run(consultaSQL, (err) => {
        if(err) {
          console.log(err)
        } else {
          event.returnValue = "Exito en la actualizacion" ;
        }
      });

      db.close();
    }catch (err) {
      throw err
    }


  })


  ipcMain.on('delete-usuario', async (event, id) => {

  try{

    openDB();

    let consultaSQL = `DELETE FROM usuarios WHERE id = ${id}; `

    db.run(consultaSQL, (err) => {
      if(err) {
        console.log(err)
      } else {
        event.returnValue = "Exito al eliminar" ;
      }
    });

    db.close();
  }catch (err) {
    throw err
  }


})


});


ipcMain.on('crear-maestro', async(event, maestro) => {

  openDB();

  try {

      let consultaSQL = `INSERT INTO maestros(titulo,nombre,apellidoPaterno,apellidoMaterno) VALUES 
      ("${maestro.nombreCompleto.titulo}","${maestro.nombreCompleto.nombre}","${maestro.nombreCompleto.apellidoPaterno}","${maestro.nombreCompleto.apellidoMaterno}");`;
      
      db.run(consultaSQL, (err) => {
        if (err) {
          event.returnValue = "Error en la insercion";
        } else {
          event.returnValue = "Exito!"
        }
      });

      db.close();
    

  } catch(err) {
    throw err;
  }
})  


ipcMain.on('get-maestros', async (event) => {

  openDB();
  try {

      let consultaSQL = `SELECT id,titulo,nombre,apellidoPaterno,apellidoMaterno FROM maestros
                ORDER BY apellidoPaterno`;

      let maestros = [];
      
      db.all(consultaSQL, (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          maestros.push(row)
        });

        event.returnValue = maestros;
      });

      db.close();
  }catch(err) {
    throw err;
  }
})

ipcMain.on('get-maestro', async (event,id) => {

  openDB();
  try {

      let consultaSQL = `SELECT titulo,nombre,apellidoPaterno,apellidoMaterno FROM maestros WHERE id LIKE "${id}"`;

      
      db.get(consultaSQL, (err, row) => {
        if (err) {
          
          event.returnValue = false;
        } else {
          if (row) {
            let maestro = {
              'nombre':row.nombre,
              'apellidoPaterno':row.apellidoPaterno,
              'apellidoMaterno':row.apellidoMaterno,
              'titulo': row.titulo
            }
  
            event.returnValue = maestro;
          }

          event.returnValue = null;

        }

      });

      db.close();
  }catch(err) {
    event.returnValue = null;
  }
})


ipcMain.on('delete-maestro', async (event, id) => {

  try{

    openDB();

    let consultaSQL = `DELETE FROM maestros WHERE id = ${id}; `

    console.log(consultaSQL);


    db.run(consultaSQL, (err) => {
      if(err) {
        console.log(err)
      } else {
        event.returnValue = "Exito al eliminar" ;
      }
    });

    db.close();
  }catch (err) {
    throw err
  }


})


ipcMain.on('update-maestro', async (event, maestro, id) => {

  try{

    openDB();

    let consultaSQL = `UPDATE maestros SET nombre = "${maestro.nombreCompleto.nombre}", apellidoPaterno = "${maestro.nombreCompleto.apellidoPaterno}", 
    apellidoMaterno = "${maestro.nombreCompleto.apellidoMaterno}" WHERE id = ${id}; `

    db.run(consultaSQL, (err) => {
      if(err) {
        console.log(err)
      } else {
        event.returnValue = "Exito en la actualizacion" ;
      }
    });

    db.close();
  }catch (err) {
    throw err
  }


})

ipcMain.on('crear-estudiante', async(event, estudiante) => {

  openDB();

  try {

      let consultaSQL = `INSERT INTO estudiantes(numeroDeControl,nombre,apellidoPaterno,apellidoMaterno,
        semestre,planDeEstudios) VALUES 
      (${estudiante.numeroDeControl},"${estudiante.nombreCompleto.apellidoPaterno}","${estudiante.nombreCompleto.apellidoMaterno}", 
      "${estudiante.nombreCompleto.nombre}", ${estudiante.semestre}, "${estudiante.planDeEstudios}");`;
      
      db.run(consultaSQL, (err,opc) => {
        if (err) {
          event.returnValue = "Error en la insercion";
        } else {
          event.returnValue = "Exito!"
        }
      });

      db.close();
    

  } catch(err) {
    throw err;
  }
})  

ipcMain.on('get-estudiantes', async (event) => {

  openDB();
  try {

      let consultaSQL = `SELECT numeroDeControl,nombre,apellidoPaterno,apellidoMaterno,semestre,planDeEstudios
       FROM estudiantes ORDER BY apellidoPaterno`;

      let estudiantes = [];
      
      db.all(consultaSQL, (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          estudiantes.push(row)
        });

        event.returnValue = estudiantes;
      });

      db.close();
  }catch(err) {
    throw err;
  }
})

ipcMain.on('update-estudiante', async (event, estudiante, numeroDeControl) => {

  try{

    openDB();

    let consultaSQL = `UPDATE estudiantes SET nombre = "${estudiante.nombreCompleto.nombre}", apellidoPaterno = "${estudiante.nombreCompleto.apellidoPaterno}", 
    apellidoMaterno = "${estudiante.nombreCompleto.apellidoMaterno}", semestre = ${estudiante.semestre}, planDeEstudios = "${estudiante.planDeEstudios}" WHERE numeroDeControl = ${numeroDeControl}; `

    db.run(consultaSQL, (err) => {
      if(err) {
        console.log(err)
      } else {
        event.returnValue = "Exito en la actualizacion" ;
      }
    });

    db.close();
  }catch (err) {
    throw err
  }


})

ipcMain.on('delete-estudiante', async (event, numeroDeControl) => {

  try{

    openDB();

    let consultaSQL = `DELETE FROM estudiantes WHERE numeroDeControl = ${numeroDeControl}; `

    db.run(consultaSQL, (err) => {
      if(err) {
        console.log(err)
      } else {
        event.returnValue = "Exito al eliminar" ;
      }
    });

    db.close();
  }catch (err) {
    throw err
  }


})

ipcMain.on('get-estudiante', async (event,numeroDeControl) => {

  openDB();
  try {

      let consultaSQL = `SELECT nombre,apellidoPaterno,apellidoMaterno FROM estudiantes WHERE numeroDeControl LIKE "${numeroDeControl}"`;

      
      db.get(consultaSQL, (err, row) => {
        if (err) {
          
          event.returnValue = false;
        } else {
          if (row) {
            let estudiante = {
              'nombre':row.nombre,
              'apellidoPaterno':row.apellidoPaterno,
              'apellidoMaterno':row.apellidoMaterno
            }
  
            event.returnValue = estudiante;
          }

          event.returnValue = null;

        }

      });

      db.close();
  }catch(err) {
    event.returnValue = null;
  }
})


ipcMain.on('crear-proyecto', async(event, proyecto) => {

  openDB();

  try {

      let consultaSQL = `INSERT INTO proyectos(nombreDelProyecto,asesor,asesorExterno,empresa, periodo) VALUES 
      ("${proyecto.nombre}","${proyecto.asesor}", "${proyecto.asesorExterno}", "${proyecto.empresa}", "${proyecto.periodo}");`;
      
      db.run(consultaSQL, (err) => {
        if (err) {
          console.log(err);
          event.returnValue = "Error en la insercion";
        } else {
          let consultaSQL = `SELECT id FROM proyectos WHERE nombreDelProyecto = "${proyecto.nombre}"`;
            
            db.get(consultaSQL, (err, row) => {
              if (err) {
                console.log(err);
                event.returnValue = false;
              } else {
                if (row) {
                  let id = row.id;
                  
                  let consultaDos = `UPDATE estudiantes SET proyecto = ${id} WHERE numeroDeControl = ${proyecto.estudianteUno} ;`;
                
                  if (proyecto.estudianteDos) {
                    let consultaTres = `UPDATE estudiantes SET proyecto = ${id} WHERE numeroDeControl = ${proyecto.estudianteDos} ;`;
                    db.run(consultaDos, (err) => {
                      if(err) {
                        event.returnValue = null;
                      } else {
                        db.run(consultaTres, (error) => {
                          if (error) {
                            event.returnValue = null;
                          }else {
                            event.returnValue = "exito";
                          }
                        })
                      }
                    });
                  }else {
                    db.run(consultaDos, (err) => {
                      if(err) {
                        event.returnValue = null;
                      } else {
                        event.returnValue = "exito";
                      }
                    });
                  }


                 

                  
                  
                 
                }

                event.returnValue = null;

              }

            });
        }
      });

      db.close();
    

  } catch(err) {
    throw err;
  }
})  

ipcMain.on('get-tabla-de-proyectos', async (event) => {
  let consultaSQL = `SELECT proyectos.tipoDeProyecto, proyectos.periodo,estudiantes.numeroDeControl,estudiantes.nombre , 
  estudiantes.apellidoPaterno, estudiantes.apellidoMaterno , proyectos.nombreDelProyecto, proyectos.id, proyectos.secretario FROM proyectos INNER JOIN estudiantes
   ON estudiantes.proyecto = proyectos.id;`;
  openDB();
  let proyectos = [];
  db.all(consultaSQL, (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      proyectos.push(row);
    });
    db.close();
    event.returnValue = proyectos;
  });
});

ipcMain.on('titulacion-proyectos', async (event, proyecto ,id) => {

  let consultaSQL = `UPDATE proyectos SET secretario = ${proyecto.secretario}, vocal = ${proyecto.vocal}, vocalSuplente = ${proyecto.vocalSuplente} , 
  tipoDeProyecto = "${proyecto.tipoDeProyecto}" WHERE proyectos.id = ${id}`;
  openDB();
  let proyectos = [];
  db.run(consultaSQL, (err) => {
    if (err) {
      db.close();
      event.returnValue = null;
    }
    db.close();
    event.returnValue = "exito";
  });
});

ipcMain.on('alumnos-tramite', async (event,id) => {
  let consultaSQL =  `SELECT proyectos.tipoDeProyecto, proyectos.empresa , proyectos.periodo , estudiantes.planDeEstudios ,
   proyectos.asesorExterno ,proyectos.asesor,proyectos.vocal,proyectos.vocalSuplente,estudiantes.numeroDeControl, estudiantes.nombre, estudiantes.apellidoPaterno, 
  estudiantes.apellidoMaterno, proyectos.nombreDelProyecto, proyectos.secretario FROM proyectos INNER JOIN estudiantes ON estudiantes.proyecto = proyectos.id WHERE 
  proyectos.id = ${id}`;
  openDB();
  try {
    let alumnos = [];
    db.all(consultaSQL, (err, rows) => {
      if (err) {
        db.close();
        event.returnValue = null;
      }
      rows.forEach((row) => {
        alumnos.push(row);
      });
      db.close();
      event.returnValue = alumnos;

    });
  }catch(error) {
    throw error;
  }

});

ipcMain.on('anexo-uno-un-estudiante', async (event, info) => {
  try {

    let outputURL = `${directory}/documentos/${info.nombreDelEstudiante}/titulacion/anexo-uno-${info.nombreDelEstudiante}.docx`;

    createReport({
      template: 'templates/anexo-uno-un-estudiante.docx',
      output: outputURL,
      data: info,
    });
    
    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000);

    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('asesor-un-estudiante', async (event, info) => {
  try {

    let outputURL = `${directory}/documentos/${info.nombreDelEstudiante}/titulacion/notificacion-asesor-${info.nombreDelEstudiante}.docx`;
    createReport({
      template: `${directory}/templates/asesor-un-estudiante.docx`,
      output: outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000);
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('acta-calificacion', async (event, info) => {
  try {

    let outputURL = `${directory}/documentos/${info.nombreDelAlumno}/residencias/acta-calificacion-${info.nombreDelAlumno}.docx`;
    createReport({
      template: `${directory}/templates/acta-calificacion.docx`,
      output: outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    throw err;
  }
});

ipcMain.on('acta-asesor', async (event, info) => {
  try {

    let outputURL = `${directory}/documentos/${info.nombreDelAlumno}/residencias/acta-asesor-${info.nombreDelAlumno}.docx`;
    createReport({
      template: `${directory}/templates/acta-asesor-interno.docx`,
      output: outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000
    )


    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('anexo-b', async (event, info) => {
  try {

    let outputURL = `${directory}/documentos/${info.nombreDelAlumno}/titulacion/anexo-b-${info.nombreDelAlumno}.docx`;
    createReport({
      template: `${directory}/templates/anexo-b.docx`,
      output: outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('revisores-uno', async (event, info) => {
  try {

   let outputURL =   `${directory}/documentos/${info.nombreDelAlumno}/titulacion/revisores-${info.nombreDelAlumno}.docx`;

    createReport({
      template: `${directory}/templates/solicitud-revisores-un-estudiante.docx`,
      output:outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('notificacion-revisores-uno', async (event, info) => {
  try {

    let outputURL = `${directory}/documentos/${info.nombreDelAlumno}/titulacion/notificacion-revisores-${info.nombreDelAlumno}.docx`;

    createReport({
      template: `${directory}/templates/notificacion-revisores-uno.docx`,
      output: outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('anexo-tres', async (event, info) => {
  try {

   let outputURL =  `${directory}/documentos/${info.nombreDelAlumno}/titulacion/anexo-tres-${info.nombreDelAlumno}.docx`;

    createReport({
      template: `${directory}/templates/anexo-tres.docx`,
      output: outputURL,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURL);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('anexo-uno-dos-estudiantes', async (event, info) => {
  
  try {

    let outputURLUno = `${directory}/documentos/${info.nombreDelEstudianteUno}/titulacion/anexo-uno-${info.nombreDelEstudianteUno}.docx`;

    let outputURLDos = `${directory}/documentos/${info.nombreDelEstudianteDos}/titulacion/anexo-uno-${info.nombreDelEstudianteDos}.docx`;

    createReport({
      template: `${directory}/templates/anexo-uno-dos-estudiantes.docx`,
      output: outputURLUno,
      data: info,
    });

    createReport({
      template: `${directory}/templates/anexo-uno-dos-estudiantes.docx`,
      output: outputURLDos,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURLUno);
      shell.openItem(outputURLDos);
    }, 1000
    )
    
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('solicitud-revisores-dos-estudiantes', async (event, info) => {
  try {

    let outputURLUno = `${directory}/documentos/${info.nombreDelEstudianteUno}/titulacion/solicitud-revisores-${info.nombreDelEstudianteUno}.docx`;

    let outputURLDos = `${directory}/documentos/${info.nombreDelEstudianteDos}/titulacion/solicitud-revisores-${info.nombreDelEstudianteDos}.docx`;


    createReport({
      template: `${directory}templates/solicitud-revisores-dos-estudiantes.docx`,
      output: outputURLUno,
      data: info,
    });

    createReport({
      template: `${directory}/templates/anexo-uno-dos-estudiantes.docx`,
      output: outputURLDos ,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURLUno);
      shell.openItem(outputURLDos);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('notificacion-asesor-dos-estudiantes', async (event, info) => {
  try {

    let outputURLUno = `${directory}/documentos/${info.nombreDelEstudianteUno}/titulacion/notificacion-asesor-${info.nombreDelEstudianteUno}.docx`;

    let outputURLDos =  `${directory}/documentos/${info.nombreDelEstudianteDos}/titulacion/notificacion-asesor-${info.nombreDelEstudianteDos}.docx`;

    createReport({
      template: `${directory}/templates/notificacion-asesor-dos-estudiantes.docx`,
      output: outputURLUno,
      data: info,
    });

    createReport({
      template: `${directory}/templates/notificacion-asesor-dos-estudiantes.docx`,
      output: outputURLDos,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURLUno);
      shell.openItem(outputURLDos);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});

ipcMain.on('notificacion-revisores-dos-estudiantes', async (event, info) => {
  try {

    let outputURLUno = `${directory}/documentos/${info.nombreDelEstudianteUno}/titulacion/notificacion-revisores-${info.nombreDelEstudianteUno}.docx`;

    let outputURLDos =  `${directory}/documentos/${info.nombreDelEstudianteDos}/titulacion/notificacion-revisores-${info.nombreDelEstudianteDos}.docx`;

    createReport({
      template: `${directory}/templates/notificacion-revisores-dos-estudiantes.docx`,
      output: outputURLUno,
      data: info,
    });

    createReport({
      template: `${directory}/templates/notificacion-revisores-dos-estudiantes.docx`,
      output: outputURLDos ,
      data: info,
    });

    setTimeout(() => {
      shell.openItem(outputURLUno);
      shell.openItem(outputURLDos);
    }, 1000
    )
    
    event.returnValue = true;
  }catch(err) {
    event.returnValue = false;
  }
});


ipcMain.on('cuenta-con-proyecto', async (event) => {
  try{
    let consultaSQL = `SELECT numeroDeControl FROM estudiantes WHERE proyecto is not null;`;
    openDB();
    db.all(consultaSQL , (err,rows) => {
      if (err) {

        throw err;
        
      } else {
        let estudiantes = [];
        rows.forEach((row) => {
          estudiantes.push(row);
        });
        db.close();
        event.returnValue = estudiantes;
      }
    })
  }catch(err) {
    db.close();
    event.returnValue = false;
  }
});

ipcMain.on('asignar-formato', async(event, numeroDeControl, proyecto, formato) => {
  let consultaSQL = `INSERT INTO formato(numeroDeControl,proyecto,formato) VALUES(${numeroDeControl}, ${proyecto}, "${formato}");`
  openDB();
  db.run(consultaSQL, (err) => {
    if (err) {
      throw err;
      event.returnValue = false;
    } else {
      event.returnValue = true;
    }
  });
});