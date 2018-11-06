mongoexport --host localhost --port 27017 --password "changeThisInfo" --collection my_db_name --db
uploads.chunks --out uploads.chunks.json
mongoexport --host localhost --port 27017 --password "changeThisInfo" --collection my_db_name --db
uploads.files --out uploads.files.json
