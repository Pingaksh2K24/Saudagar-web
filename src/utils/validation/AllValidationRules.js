import { CommonValidationMessages } from '../../utils/Messages';

// Login validation rules
export const LoginValidationRules = {
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'email'),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  password: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'password'
      ),
    },
  ],
};
// Add user validation rules
export const AddUserValidationRules = {
  full_name: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'full name'
      ),
    },
  ],
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'email'),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  mobile_number: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'mobile number'
      ),
    },
  ],
  password: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'password'
      ),
    },
  ],
  confirmPassword: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'confirm password'
      ),
    },
    {
      type: 'compare',
      compareEle: 'password',
      message: CommonValidationMessages.ComparePassword,
    },
  ],
  // role: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "role"),
  //     }
  // ],
  village: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'village'),
    },
  ],
  address: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'address'),
    },
  ],
};
// Edit user validation rules
export const EditUserValidationRules = {
  full_name: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'full name'
      ),
    },
  ],
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'email'),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  mobile_number: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'mobile number'
      ),
    },
  ],
  // role: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "role"),
  //     }
  // ],
  village: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'village'),
    },
  ],
  address: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'address'),
    },
  ],
};

// Company Profile Validation Rule
export const CompanyProfileValidationRules = {
  companyName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'company name'
      ),
    },
  ],
  // brandName: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.FieldRequired.replace("{0}", "brand name"),
  //     }
  // ],
  companyTypeId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'company type'
      ),
    },
  ],
  // companyUEN: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.FieldRequired.replace("{0}", "company UEN"),
  //     },
  //     {
  //         type: "isCompanyUEN",
  //         message: "Please enter valid company UEN"
  //     },
  // ],
  incorporationDate: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'date of incorporation'
      ),
    },
    {
      type: 'isMaxDate',
      message: "Incorporation Date must be earlier than today's date",
    },
    {
      type: 'isMinDate',
      message: 'Please check your date of incorporation',
    },
  ],
  // countryOfIncorporationId: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "country of incorporation"),
  //     }
  // ],
  companyAddress1: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'address line 1'
      ),
    },
  ],
  // companyAddress2: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "address line 2"),
  //     }
  // ],
  postalCode: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'postal code'
      ),
    },
    {
      type: 'minLength',
      minLength: 6,
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid postal code'
      ),
    },
    {
      type: 'maxLength',
      maxLength: 6,
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid postal code'
      ),
    },
    {
      type: 'number',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'only digits'
      ),
    },
  ],
  countryId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'country'
      ),
    },
  ],
  website: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'website'),
    },
    {
      type: 'isValidateURL',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid url'
      ),
    },
  ],
  // aCRAFilePath: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "ACRA file"),
  //     }
  // ],
  description: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'description'
      ),
    },
  ],
  annualSalesTurnoverId: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'annual turnover'
      ),
    },
  ],
  employmentSizeId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'employement size'
      ),
    },
  ],
  businessTypeIds: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'business type'
      ),
    },
  ],
  interestIds: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'intrested'
      ),
    },
  ],
  // knowAboutUsOthers: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "know about us"),
  //     }
  // ],
  knowAboutUsId: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'get to know'
      ),
    },
  ],
};

// Point Of Contact Information Validation Rules
export const PointOfContactInformationValidationRules = {
  salutationId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'salution'
      ),
    },
  ],
  firstName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'first name'
      ),
    },
  ],
  lastName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'last name'
      ),
    },
  ],
  designation: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'designation'
      ),
    },
  ],
  jobPositionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'job position'
      ),
    },
  ],
  businessEmail: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'business email'
      ),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  businessContactNumber: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'business contact number'
      ),
    },
    {
      type: 'number',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'only digits'
      ),
    },
  ],
  // comments: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.FieldRequired.replace("{0}", "comments"),
  //     }
  // ],
};
// Finance Department Validation Rules
export const FinanceDepartmentValidationRules = {
  salutationId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'salution'
      ),
    },
  ],
  firstName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'first name'
      ),
    },
  ],
  lastName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'last name'
      ),
    },
  ],
  designation: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'designation'
      ),
    },
  ],
  jobPositionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'job position'
      ),
    },
  ],
  businessEmail: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'business email'
      ),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  businessContactNumber: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'business contact number'
      ),
    },
  ],
};

/* Individual Member Validation Rule  */
// Company Profile Validation Rule
export const CompanyInformationValidationRules = {
  jobPositionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'job position'
      ),
    },
  ],
  // industryTypeId: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "industry"),
  //     }
  // ],
};
// Other Information Validation Rules
export const OtherInformationValidationRules = {
  selectedInterestedIns: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'interest'
      ),
    },
  ],
  selectedCommunicationChannels: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'communication channel'
      ),
    },
  ],
  selectedEnewsletters: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'e-newsletter'
      ),
    },
  ],
  aboutUsId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'hear about us'
      ),
    },
  ],
  // knowAboutUsOthers: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "specify"),
  //     }
  // ],
  otherCompanyInterests: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'interest'
      ),
    },
  ],
};
export const IndEngagementTrackingValidationRules = {
  corporateEngagementRecordedById: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'recorded by'
      ),
    },
  ],
};
// Other Information Validation Rules
export const IndividualInformationValidationRules = {
  salutationId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'salutation'
      ),
    },
  ],
  firstName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'first name'
      ),
    },
  ],
  lastName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'last name'
      ),
    },
  ],
  yearOfBirth: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'year of birth'
      ),
    },
  ],
  mobileNumber: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace('{0}', 'mobile'),
    },
  ],
  emailAddress: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'email address'
      ),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  nationalityId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'nationality'
      ),
    },
  ],
};
// Institute Information Validation Rules
export const InstituteInformationValidationRules = {
  instituteId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'name of institute'
      ),
    },
  ],
  instituteWebsite: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'individual website'
      ),
    },
  ],
  countryOfStudiesId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'country of studies'
      ),
    },
  ],
  pursuingQualificationId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'pursuing qualification'
      ),
    },
  ],
  specialisation: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'specialisation'
      ),
    },
  ],
  // yearOfCommencementId: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.SelectRequired.replace("{0}", "year of commencement"),
  //     }
  // ],
  yearOfCompletionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'year of completion'
      ),
    },
  ],
};
// Organisation Key Role Validation Rules
export const OrganisationKeyRoleValidationRules = {
  mrMrs: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'salutation'
      ),
    },
  ],
  firstName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'first name'
      ),
    },
  ],
  lastName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'last name'
      ),
    },
  ],
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'email address'
      ),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  // contactNo: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.FieldRequired.replace("{0}", "contact number"),
  //     },
  //     {
  //         type: "number",
  //         message: CommonValidationMessages.FieldRequired.replace("{0}", "only digits"),
  //     },
  // ],
  jobPositionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'job function'
      ),
    },
  ],
  selectedOrganisationRole: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'organisation roles'
      ),
    },
  ],
};
// Organisation Key Role Validation Rules
export const OrganisationEmployeeValidationRules = {
  mrMrsId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'salutation'
      ),
    },
  ],
  firstName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'first name'
      ),
    },
  ],
  lastName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'last name'
      ),
    },
  ],
  email: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'email address'
      ),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  contactNo: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'contact number'
      ),
    },
    {
      type: 'number',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'only digits'
      ),
    },
  ],
  jobPositionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'job function'
      ),
    },
  ],
  title: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'designation'
      ),
    },
  ],
};
export const RepresantativeInformationValidationRules = {
  salutationId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'salution'
      ),
    },
  ],
  firstName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'first name'
      ),
    },
  ],
  lastName: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'last name'
      ),
    },
  ],
  designation: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'designation'
      ),
    },
  ],
  jobPositionId: [
    {
      type: 'require',
      message: CommonValidationMessages.SelectRequired.replace(
        '{0}',
        'job position'
      ),
    },
  ],
  businessEmail: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'business email'
      ),
    },
    {
      type: 'email',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'valid email address'
      ),
    },
  ],
  businessContactNo: [
    {
      type: 'require',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'business contact number'
      ),
    },
    {
      type: 'number',
      message: CommonValidationMessages.FieldRequired.replace(
        '{0}',
        'only digits'
      ),
    },
  ],
  // comments: [
  //     {
  //         type: "require",
  //         message: CommonValidationMessages.FieldRequired.replace("{0}", "comments"),
  //     }
  // ],
};
