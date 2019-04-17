using System;
using System.Collections.Generic;
using System.Text;

namespace DanceCoolDTO.Infrastructure
{
    class ValidationRules
    {
        public const string EMAIL_REGEX = @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
        public const int MAX_PAGE_SIZE = 20;
    }
}
