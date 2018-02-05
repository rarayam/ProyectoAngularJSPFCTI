
   CREATE SEQUENCE  "AM"."ASSETMOVEMENT_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOPARTITION ;

  CREATE TABLE "AM"."ASSETMOVEMENT" 
   (	"MOVEMENTID" NUMBER NOT NULL ENABLE, 
	"ASSETNUMBER" VARCHAR2(10 BYTE) NOT NULL ENABLE, 
	"ASSETIP" VARCHAR2(15 BYTE) NOT NULL ENABLE, 
	"USERNAME" VARCHAR2(30 BYTE) NOT NULL ENABLE, 
	"MOVEMENTTYPE" VARCHAR2(3 BYTE) NOT NULL ENABLE, 
	"ACCESORIESDETAIL" VARCHAR2(50 BYTE), 
	"MOVEMENTREASON" VARCHAR2(200 BYTE), 
	"MOVEMENTDATE" TIMESTAMP (6) NOT NULL ENABLE, 
	 CONSTRAINT "ASSETMOVEMENT_PK" PRIMARY KEY ("MOVEMENTID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 
  TABLESPACE "USERS"  ENABLE, 
	 CONSTRAINT "ASSETMOVEMENT_CHK1" CHECK (MOVEMENTTYPE IN ('IN', 'OUT')) ENABLE, 
	 CONSTRAINT "ASSETMOVEMENT_ASSETBYUSER_FK1" FOREIGN KEY ("ASSETNUMBER", "ASSETIP", "USERNAME")
	  REFERENCES "AM"."ASSETBYUSER" ("ASSETNUMBER", "ASSETIP", "USERNAME") ENABLE
   ) SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  TABLESPACE "USERS" ;

   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."ASSETNUMBER" IS 'Numero de activo';
   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."ASSETIP" IS 'Direccion IP de activo';
   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."USERNAME" IS 'Nombre de usuario';
   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."MOVEMENTTYPE" IS 'Tipo de movmiento';
   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."ACCESORIESDETAIL" IS 'Detalle de accesorios que salen';
   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."MOVEMENTREASON" IS 'Razon de movimiento';
   COMMENT ON COLUMN "AM"."ASSETMOVEMENT"."MOVEMENTDATE" IS 'Fecha de movimiento';
   COMMENT ON TABLE "AM"."ASSETMOVEMENT"  IS 'Movimientos de entrada o salida de activos';

  CREATE OR REPLACE EDITIONABLE TRIGGER "AM"."ASSETMOVEMENT_TRG" BEFORE INSERT ON ASSETMOVEMENT 
FOR EACH ROW 
BEGIN
  <<COLUMN_SEQUENCES>>
  BEGIN
    IF :NEW.MOVEMENTID IS NULL THEN
      SELECT ASSETMOVEMENT_SEQ.NEXTVAL INTO :NEW.MOVEMENTID FROM DUAL;
    END IF;
  END COLUMN_SEQUENCES;
END;
/
ALTER TRIGGER "AM"."ASSETMOVEMENT_TRG" ENABLE;
