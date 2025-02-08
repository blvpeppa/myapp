SELECT * FROM app
INSERT INTO app (teachers,students) values(?,?)',[teachers,students]
UPDATE app set teachers = ?,students = ? where id = ?',[teachers,students,id]