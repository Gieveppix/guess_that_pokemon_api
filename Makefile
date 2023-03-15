postgres:
	docker run --name pokemon_api -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=pass -d postgres:15-alpine

createdb:
	docker exec -it pokemon_api createdb --username=root --owner=root pokemon_api
	
dropdb:
	docker exec -it pokemon_api dropdb pokemon_api

migrate: 
	npx knex migrate:make $(MIGRATION)

migrateup:
	npx knex migrate:up

migratedown:
	npx knex migrate:down

migratelatest:
	npx knex migrate:latest

server:
	npx nodemon

.PHONY: postgres createdb dropdb migrate migrateup migratedown migratelatest server