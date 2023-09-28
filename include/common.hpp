#include <string>

#ifndef COMMON_H
#define COMMON_H

const std::string DOMAIN = "bati.io";
const int PORT = 9600;
const int URL_SUFFIX_SIZE = 8;
const int SECRET_KEY_SIZE = 25;

struct URLData {
  std::string main;
  std::string suffix;
  std::string secret_key;
};

#endif
