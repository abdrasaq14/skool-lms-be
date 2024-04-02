// import { createProfessionalApplication, getProfessionalApplication } from "../src/controller/professional";
// import { AppDataSource } from "../src/database/data-source";
// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";
// import { User } from "../src/entity/user";
// import { ProfessionalApplication } from "../src/entity/professional-app";
// import cloudinary from "../src/utilities/cloudinary";

// jest.mock("jsonwebtoken");
// jest.mock("../src/database/data-source");
// jest.mock("../src/utilities/cloudinary");

// // Mocked User data
// const mockedUser = {
//     id: 'user_id',
//     firstName: 'Test',
//     lastName: 'User',
//     email: 'test@example.com',
//     phoneNumber: '1234567890',
//     password: 'hashed_password',
//     countryOfResidence: 'Test Country',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     otp: '123456',
//     otpSecret: 'secret_base32',
//     otpExpiration: new Date(Date.now() + 300000), // 5 minutes from now
//     isVerified: true,
//     isAdmin: false,
//   };

// describe("Professional Application Tests", () => {
//   let req: Partial<Request>;
//   let res: Partial<Response> & { json: jest.Mock; status: jest.Mock };

//   const mockUserRepository = {
//     findOne: jest.fn(),
//     save: jest.fn(),
//   };

//   const mockProfessionalApplicationRepository = {
//     findOne: jest.fn(),
//     save: jest.fn(),
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();

//     req = {
//       headers: { authorization: "Bearer validtoken" },
//       body: {
//         personalStatement: "My Statement",
//         passportUpload: "path/to/passport.jpg",
//       },
//     };

//     res = {
//       json: jest.fn(),
//       status: jest.fn().mockReturnThis(),
//     };

//     (jwt.verify as jest.Mock).mockReturnValue({ id: "user_id" });

//     (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
//       if (entity === User) return mockUserRepository;
//       if (entity === ProfessionalApplication) return mockProfessionalApplicationRepository;
//       throw new Error("Not mock implementation for entity");
//     });

//     (cloudinary.v2.uploader.upload as jest.Mock).mockResolvedValue({ secure_url: "path/to/image.jpg" });
//   });

//   it("should successfully create a professional application", async () => {
//     mockUserRepository.findOne.mockResolvedValue(mockedUser);
//     mockProfessionalApplicationRepository.save.mockResolvedValue(new ProfessionalApplication());

//     await createProfessionalApplication(req as Request, res as Response);

//     expect(jwt.verify).toHaveBeenCalled();
//     expect(mockUserRepository.findOne).toHaveBeenCalled();
//     expect(mockProfessionalApplicationRepository.save).toHaveBeenCalled();
//     expect(res.json).toHaveBeenCalledWith({ successMessage: "Application submitted successfully" });
//   });

//   // ...More tests for createProfessionalApplication

//   describe("getProfessionalApplication Tests", () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//       req = { params: { id: "application_id" } };
//     });

//     it("should retrieve and return a professional application", async () => {
//         mockProfessionalApplicationRepository.findOne.mockResolvedValue({
//             id: "application_id",
//             personalStatement: "My Statement",
//             // Populate with required fields
//             user: mockedUser, // Instead of new User()
//             // Add other properties as needed for the test
//           });

//       await getProfessionalApplication(req as Request, res as Response);

//       expect(mockProfessionalApplicationRepository.findOne).toHaveBeenCalled();
//       expect(res.json).toHaveBeenCalled();
//     });

//     // Additional tests for getProfessionalApplication
//   });

//   // ...More tests for other functionalities
// });

import { createProfessionalApplication, getProfessionalApplication } from "../src/controller/professional";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../src/database/data-source";
import { User } from "../src/entity/user";
import { ProfessionalApplication } from "../src/entity/professional-app";
import cloudinary from "../src/utilities/cloudinary";
import { Request, Response } from "express";

// Correctly mock the jwt, AppDataSource, and cloudinary modules at the top level
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"), // If you want to keep some original functionality
  verify: jest.fn().mockReturnValue({ id: "user_id" }),
}));

jest.mock("../src/database/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

jest.mock("../src/utilities/cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn().mockResolvedValue({ secure_url: "https://cloudinaryUrl/toImage.jpg" }),
    },
  },
}));

// Assuming your User entity does not need to be mocked for this test,
// if it does, consider mocking it similarly

describe("Professional Application Tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response> & { json: jest.Mock; status: jest.Mock };

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockProfessionalApplicationRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
        headers: { authorization: "Bearer validtoken" },
        body: {
          personalStatement: "My personal statement",
          passportUpload: "fakePath/toImage.jpg"
        }
      };
  
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      (jwt.verify as jest.Mock).mockReturnValue({ id: "user_id" });

    // Set up mocks for AppDataSource.getRepository
    (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
      if (entity === User) {
        return mockUserRepository;
      } else if (entity === ProfessionalApplication) {
        return mockProfessionalApplicationRepository;
      }
      throw new Error("Unexpected entity");
    });
  });

  // Your test cases 
    it("should successfully create a professional application", async () => {
      mockUserRepository.findOne.mockResolvedValue(new User("John", "Doe", "john@example.com", "1234567890", "hashedPassword", "USA", new Date(), new Date(), "123456", "secret", new Date(), false, false));
      mockProfessionalApplicationRepository.save.mockResolvedValue({});
  
      await createProfessionalApplication(req as Request, res as Response);
  
      expect(jwt.verify).toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: "user_id" } });
      expect(mockProfessionalApplicationRepository.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ successMessage: "Application submitted successfully" });
    });
  
    it("should return unauthorized if token is missing", async () => {
      delete req.headers?.authorization;
      await createProfessionalApplication(req as Request, res as Response);
  
      expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });
  
    // Additional tests for other scenarios...
});
  