--Conectar como SYS as SYSDBA
alter session set "_ORACLE_SCRIPT"=true; 

--luego aplicar esto

 CREATE USER AM
  IDENTIFIED BY Temporal123456789
  DEFAULT TABLESPACE Employee
  TEMPORARY TABLESPACE TEMP
  QUOTA 20M on SYSTEM
  
  --
  grant dba to AM;