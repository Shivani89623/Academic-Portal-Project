package com.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
@Getter
	@AllArgsConstructor
	public class LoginResponse {
	    private String token;
	    private String TeacherName;
	    private String role;
	}

