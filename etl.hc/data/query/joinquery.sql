USE CDC_FDB_DB
go
SELECT PatientID AS MRN,
	   FirstName AS Name,
	   MiddleName AS Fname,
	   SurName AS Gfname,
	   Sex AS Gender,
	   DateOfBirth AS DOB,
	   Address.CommunityName AS kebele,
	   Address.PhoneNumber,
	   Address.DistrictName AS Woreda
	   Address.CreatedTime  AS date
FROM Registration INNER JOIN Address ON Registration.PatientGUID = Address.PatientGUID