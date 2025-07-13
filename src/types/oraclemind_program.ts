export type OraclemindProgram = {
  "address": "2qa3SpCoeuSb2FNHoJGx3q9ufeGvri68ahvx5vFi7QFZ",
  "metadata": {
    "name": "oraclemindProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "claimWinnings",
      "discriminator": [
        161,
        215,
        24,
        59,
        14,
        236,
        242,
        221
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketAccount",
          "writable": true
        },
        {
          "name": "bettor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "marketAccount"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "bettorAta",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "createMarket",
      "discriminator": [
        103,
        226,
        97,
        235,
        200,
        188,
        251,
        254
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "title"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketAccount"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "endTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "placeBet",
      "discriminator": [
        222,
        62,
        67,
        220,
        63,
        166,
        126,
        33
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  97,
                  114,
                  107,
                  101,
                  116,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "market_account.title",
                "account": "market"
              }
            ]
          }
        },
        {
          "name": "bettor",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  98,
                  101,
                  116,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "marketAccount"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "bettorAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "signer"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketAccount"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "betSide",
          "type": "bool"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "resolveMarket",
      "discriminator": [
        155,
        23,
        80,
        173,
        46,
        74,
        23,
        239
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketAccount",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "result",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bettor",
      "discriminator": [
        126,
        54,
        2,
        128,
        133,
        184,
        253,
        108
      ]
    },
    {
      "name": "market",
      "discriminator": [
        219,
        190,
        213,
        55,
        0,
        227,
        198,
        154
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidMarketMaker",
      "msg": "unauthorized"
    },
    {
      "code": 6001,
      "name": "marketAlreadyResolved",
      "msg": "Market has already been resolved"
    },
    {
      "code": 6002,
      "name": "marketEndTimeExceeded",
      "msg": "Market end time has been exceeded"
    },
    {
      "code": 6003,
      "name": "marketNotEndedYet",
      "msg": "Market has not ended yet"
    },
    {
      "code": 6004,
      "name": "marketNotResolved",
      "msg": "Market has not been resolved yet"
    },
    {
      "code": 6005,
      "name": "alreadyClaimed",
      "msg": "Winnings have already been claimed"
    },
    {
      "code": 6006,
      "name": "notAWinner",
      "msg": "User did not bet on the winning side"
    },
    {
      "code": 6007,
      "name": "invalidVault",
      "msg": "Invalid vault token account"
    },
    {
      "code": 6008,
      "name": "invalidBetSide",
      "msg": "Betting on an invalid side"
    },
    {
      "code": 6009,
      "name": "insufficientBetAmount",
      "msg": "Insufficient amount to bet"
    },
    {
      "code": 6010,
      "name": "unauthorized",
      "msg": "Unauthorized action"
    }
  ],
  "types": [
    {
      "name": "bettor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "market",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "betSide",
            "type": "bool"
          },
          {
            "name": "isClaimed",
            "type": "bool"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "yesAmount",
            "type": "u64"
          },
          {
            "name": "noAmount",
            "type": "u64"
          },
          {
            "name": "yesCount",
            "type": "u64"
          },
          {
            "name": "noCount",
            "type": "u64"
          },
          {
            "name": "isResolved",
            "type": "bool"
          },
          {
            "name": "result",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "aiInsight",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "marketMaker",
      "type": "string",
      "value": "\"\""
    }
  ]
};
