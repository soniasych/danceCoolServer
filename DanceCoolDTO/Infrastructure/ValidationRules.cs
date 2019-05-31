namespace DanceCoolDTO.Infrastructure
{
    class ValidationRules
    {
        public const int MAX_LENGTH_NAME = 20;
        public const string ONLY_LETTERS = @"^[a-zA-z]*$";
        public const string ONLY_LETTERS_AND_NUMBERS = @"^[a-zA-z0-9]*$";
        public const string EMAIL_REGEX = @"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    }
}
