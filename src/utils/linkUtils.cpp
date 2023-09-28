#include <chrono>
#include <ctime>
#include <string>

#include "common.hpp"

inline std::string shiftTextByN(std::string text) {
  int text_len = text.size();
  int shift_by = rand() % (10);
  char temp;

  for (int i = 0; i < text_len; ++i) {
    temp = text[i] + shift_by;
    if ((temp >= '0' && temp <= '9') && (temp >= 'a' && temp <= 'z'))
      text[i] = temp;
  }
  return text;
}

std::string genShortUrlId(int url_size = URL_SUFFIX_SIZE) {
  srand(time(NULL));
  std::string char_set = "0123456789abcdefghijkmnopqrstuvwxyz";
  std::string short_url_id = "";

  for (int i = 0; i < url_size; ++i) {
    short_url_id.push_back(char_set[rand() % sizeof char_set]);
  }
  return shiftTextByN(short_url_id);
}
