package com.ray.api.dao;

import com.ray.api.entity.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<User, Long> {
}
