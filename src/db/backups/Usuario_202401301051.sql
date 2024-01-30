INSERT INTO [Blui-Local].dbo.Usuario (firstname,password,email,phone,address,city,region,country,lastname,comuna_id,imgUrl,forWhom,nombrePaciente,rut,created_at,verified) VALUES
	 (N'Juan',N'hashedpassword1',N'juan@example.com',N'1234567890',N'123 Calle Principal',N'Santiago',N'RM',N'Chile',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),
	 (N'Ana',N'hashedpassword2',N'ana@example.com',N'0987654321',N'456 Avenida Arce',N'Valparaíso',N'Valparaíso',N'Chile',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),
	 (N'John',N'$2b$10$D25xsWp6rx5HQ0uzOwvE2O.UDyJKBuxtCAzhnn.tfG3ojRLTukRQ2',N'john.doe@example.com',NULL,NULL,NULL,NULL,NULL,N'Doe',NULL,NULL,NULL,NULL,NULL,NULL,0),
	 (N'charles',N'$2b$10$GC6T5WMvZtZ7zITy4wLwketddJC2dopDzqN7ckQvoB4uxcE3c7ow2',N'cgumuci@gmail.com',NULL,NULL,NULL,NULL,NULL,N'charles',229,NULL,N'Para mí',N'charles',N'19945012-2',NULL,0),
	 (N'test',N'$2b$10$1aRXJGHmG6WEU96rJmWK..Iq0dA0u7Y07l1pwpnL7b.dO0j80Wgr.',N'test@test.com',NULL,NULL,NULL,NULL,NULL,N'test',229,NULL,N'',N'',N'test-1',NULL,0),
	 (N'test',N'$2b$10$sw3nsYhqVQmthpH6oIKAc.ZISmtyZJJsojj/nxVpQk9qp0n8RYDxm',N'test2@test2.com',NULL,NULL,NULL,NULL,NULL,N'test2',229,NULL,N'Para un amigo(a) o familiar',N'Para un amigo(a) o familia',N'testtest',NULL,0),
	 (N'Pablo',N'$2b$10$wLR4rWvIqHLLq762NbRUMeJOxhwHV8Ks9FRiYr8WRj0QfJiSq7j4e',N'pablo@escobar.com',NULL,NULL,NULL,NULL,NULL,N'Escobar',229,NULL,N'Para un amigo(a) o familiar',N'Sergio',N'18444555-2',NULL,0),
	 (N'Nicolas',N'$2b$10$bAF63RmxmqJcvRcxkcXzauvi9FuuLR2fC8bmYrfK9IK9TDx6QUnUK',N'nicolasboettoh@gmail.com',NULL,NULL,NULL,NULL,NULL,N'Boetto',1,NULL,N'Para un amigo(a) o familiar',N'Diego',N'16610247-2',NULL,0);
