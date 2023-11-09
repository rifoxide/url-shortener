#include <string>

#ifndef COMMON_H
#define COMMON_H

const int PORT = 9600;
const int URL_SUFFIX_SIZE_MIN = 4;
const int URL_SUFFIX_SIZE_MAX = 30;
const int SECRET_KEY_SIZE = 25;

struct URLData {
  std::string main;
  std::string suffix;
  std::string secret_key;
};

#endif
