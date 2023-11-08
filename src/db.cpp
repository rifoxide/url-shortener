#include <iostream>
#include <map>

#include "common.hpp"
#include "status_codes.h"

class Database {
  std::map<std::string, URLData> data;

 public:
  Database() { std::cout << "loading data\n"; }

  /*
  insert record
  @param url URLData
  return (int) - URL_GEN_SUCCESS when url was added successfully.
                 URL_GEN_FAILED when url was not added successfully.
  */
  int add(URLData url) {
    try {
      data.insert(std::make_pair(url.suffix, url));
      return URL_GEN_SUCCESS;
    } catch (...) {
      return URL_GEN_FAILED;
    }
  }

  /*
  delete a record.

  clears the main url and secret key.
  preserves the url suffix for future ref.

  @param url URLData
  @return (int) - URL_DEL_SUCCESS if url was revoked successfully.
                  URL_DEL_FAILED if url was not revoked successfully.
  */
  int del(URLData url) {
    auto it = data.find(url.suffix);

    if (it != data.end()) {
      it->second.main.clear();
      it->second.secret_key.clear();
      return URL_DEL_SUCCESS;
    } else {
      return URL_DEL_FAILED;
    }
  }

  /*
  check if a url exist or not
  @param url URLData
  @return (bool) - true if url exist.
  */
  bool check(URLData url) {
    auto it = data.find(url.suffix);
    return URL_SUFFIX_EXISTS ? (it != data.end()) : false;
  }

  /*
  get a url.
  @param url URLData
  @return (URLData) - found url data.
  */
  URLData get(URLData url) {
    auto it = data.find(url.suffix);
    if (it != data.end()) {
      return it->second;
    } else {
      URLData empty_url;
      return empty_url;
    }
  }
};