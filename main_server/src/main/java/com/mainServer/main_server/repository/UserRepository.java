package com.mainServer.main_server.repository;

import com.mainServer.main_server.entity.User;
import com.mainServer.main_server.entity.type.AuthProviderType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {

    Optional<User> findByEmail(String email);

    Optional<User> findByProviderIdAndAuthProviderType(String providerId, AuthProviderType providerType);

    Optional<User> findByApiKey(String apiKey);
}
