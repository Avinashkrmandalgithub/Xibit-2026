package com.mainServer.main_server.repository;

import com.mainServer.main_server.entity.DocumentData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentDataRepository extends MongoRepository<DocumentData,String> {

}